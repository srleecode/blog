---
title: Component commands
description: An explanation of component commands and why they are useful
tags: Cypress
publishedDate: 29/11/2020
published: true
---

# Component commands

When writing E2E tests you want to abstract the selection of elements, as the selectors can be brittle and the more instances of them there are the harder it is to update them. This abstraction can happen in a few different ways. For example, page objects or [component test harnesses](https://material.angular.io/cdk/test-harnesses/overview), the most common cypress way of doing this is to use [custom commands](https://docs.cypress.io/api/cypress-api/custom-commands.html).

Component commands are custom commands that expose functions and getters for a specific component. There are two primary benefits to using component commands in your tests:
 - they make tests easier to read and understand by exposing straightforward and testable APIs.
 - they make tests more robust and less likely to break by reducing the number of times a selector gets defined. With component commands, changing a selector requires only one place to be updated.


The below is an example of a component command being used for a shared/table component.

```ts
cy.sharedTable() // component command for the shared table component
  .map('getColumn', 1) // getColumn function in the component command class that retrieves a sub component class Column
  .prop('title') // title property in the sub component class Column
  .should('eq', 'Account number');
```

This component command is defined below:

```ts
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      sharedTable(): Chainable<SharedTable>
    }
  }
}

class Column {
    constructor(public element: JQuery) {}

    get title(): Cypress.Chainable<string> {
        return cy
            .wrap(this.element)
            .invoke('text')
            .then(text => text.trim());

    }
}

export class SharedTable {
    constructor(public element: JQuery) {}

    getColumn(index: number): Cypress.Chainable<Column> {
        return find(this, { index: index - 1}, 'th').create(Column);
    }
}

Cypress.Commands.add('sharedTable', (selector?: SelectorOptions) => get(selector, 'shared-table').create(SharedTable));
```

It is often the case that you want to select not just a component, but a particular instance of that component. Some examples are: 
 - data-cy: selecting a table component with a particular data-cy attribute
 - index: selecting the second table component
 - css: selecting a table component with a particular css class or id
 - text: selecting a button component with particular text in it.

Using the `get` and `find` functions shown below by passing a `SelectorOptions` object allows this kind of fine grained selection.

```ts
interface SelectorOptions {
    dataCy?: string;
    css?: string;
    index?: number;
    text?: string;
}

export const get = (selector: SelectorOptions = {}, defaultQuery: string): Cypress.Chainable<JQuery> => {
    const query = getQuery(selector, defaultQuery);
    const baseItem = cy.get(query);
    return getSelectedItem(baseItem, selector);
}

export const find = (
    component: ComponentClass,
    selector: SelectorOptions = {},
    defaultQuery: string
): Cypress.Chainable<JQuery> => {
    const query = getQuery(selector, defaultQuery);
    const baseItem = cy.wrap(component.element).find(query);
    return getSelectedItem(baseItem, selector);
}

const getQuery =  (selector: SelectorOptions, defaultQuery: string): string => {
    const { dataCy, css } = selector;
    if (dataCy) {
        return `${defaultQuery}[data-cy=${dataCy}]`;
    } else if (css) {
        return `${defaultQuery}${css}`;
    }
    return defaultQuery;
};

const getSelectedItem = (baseItem: Cypress.Chainable<JQuery>, selector: SelectorOptions) => {
     const { index, text } = selector;
     if (index !== undefined) {
         return baseItem.eq(index);
     } else if (text !== undefined) {
         return baseItem.contains(text);
     }
     return baseItem;
}
```

An important point to note is that Component commands should use cypress commands.

The component command element is at the component tag level as this is where you add data-cy attributes and it is from this level that you can select all the required sub elements that are required in the methods or properties of the component command. Operations, however, should happen on the basic HTML elements. This is because Cypress has internal waiting mechanisms. These mechanisms don't work if the operations occur at higher levels and will get skipped if you use jquery to perform the operations. In general, this means that all operations need to first select a sub element to do the operation on and then use cypress commands to perform the operation. 

For example, if the operation happens at the component level, e.g. shared-button, then it will lead to hard to debug issues. While you can click on the shared-button component element, the disabled check that cypress does internally won't find anything as the attibute when the button is disabled isn't at this level it is on the actual button, so you won't get the right error message.

Falling back to JQuery might be needed in some cases. For example, getting array of the values in all the chips for a chips component. Trying to do this with just cypress will end up with Chainable<Chainable<string>[]>, so falling back to jquery in this instance is needed.

One area that you won't be able to use component commands is when you want to check that a component does not exist. This scenario will fail in the component command selection, so for checking for non existence you need to fall back to using standard cypress.

The below are useful custom commands that allow component commands to be used and chained in a readable way.

```ts
type MethodKeys<T> = ({ [P in keyof T]: T[P] extends Function ? P : never })[keyof T];
type Methods<T> = Pick<T, MethodKeys<T>>;
type PropKeys<T> = ({ [P in keyof T]: T[P] extends Function ? never : P })[keyof T];
type Props<T> = Pick<T, PropKeys<T>>;

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      prop<F extends Props<Subject>, K extends keyof F>(property: K): F[K];
      map<F extends Methods<Subject>, K extends keyof F>(method: K, ...arrgs: any[]): Chainable<any>;
      tap<F extends Methods<Subject>, K extends keyof F>(method: K, ...arrgs: any[]): Chainable<Subject>;
      create<T extends ComponentClass>(classToCreate: new (element: JQuery) => T): Chainable<T>;
    }
  }
}

Cypress.Commands.add('prop', { prevSubject: true}, (subject, property, ...args) => {
    Cypress.log({
        displayName: 'prop',
        message: `${property} in subject`
    });
    if (property in subject) {
        return subject[property];
    }
    throw new Error(`Cannot find ${property} in subject`);
});

Cypress.Commands.add('map', { prevSubject: true}, (subject, method, ...args) => {
    Cypress.log({
        displayName: 'map',
        message: `${method} in subject`
    });
    if (subject[method]) {
        return subject[method](...args);
    }
    throw new Error(`Cannot find ${method} in subject`);
});

Cypress.Commands.add('elementMap', { prevSubject: true}, (subject, method, ...args) => {
    Cypress.log({
        displayName: 'elementMap',
        message: `${method} in subject's element`
    });
    if (subject.element) {
        return cy.wrap(subject.element)[method](...args);
    }
    throw new Error(`Cannot find ${method} in subject's element`);
});

Cypress.Commands.add('tap', { prevSubject: true}, (subject, method, ...args) => {
    Cypress.log({
        displayName: 'tap',
        message: `${method} in subject`
    });
    if (subject[method]) {
        return cy.wrap(subject)[method](...args).then(() => subject);
    }
    throw new Error(`Cannot find ${method} in subject`);
});

Cypress.Commands.add('elementTap', { prevSubject: true}, (subject, method, ...args) => {
    Cypress.log({
        displayName: 'elementTap',
        message: `${method} in subject's element`
    });
    if (subject.element) {
        return cy
            .wrap(subject.element)
            [method](...args)
            .then(() => subject);
    }
    throw new Error(`Cannot find ${method} in subject's element`);
});

Cypress.Commands.add('create', { prevSubject: true}, (subject, classToCreate, ...args) => {
    if (isComponentClass(subject)) {
        return cy.wrap(subject.element).then(e => create(e, classToCreate));
    }
    return cy.wrap(create(subject, classToCreate));
});
```

```ts
const isJQuery = (arg: HTMLElement | JQuery): arg is JQuery => (arg as JQuery).jquery !== undefined;

export class ComponentClass {
    constructor(public element: JQuery) {}
}

export const isComponentClass = (arg: ComponentClass): arg is ComponentClass => (arg as ComponentClass).element !== undefined;

export const create = <T extends ComponentClass>(
    subject: HTMLElement | JQuery,
    classToCreate: new (element: JQuery) => T
): T => {
    if (subject === undefined) {
        throw new Error(`Tried to create ${classToCreate.name} when subject is undefined`);
    }
    if (isJQuery(subject)) {
        return new classToCreate(subject);
    }
    return new classToCreate(Cypress.$(subject));
}
```