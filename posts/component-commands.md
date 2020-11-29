---
title: Component commands
description: An explanation of component commands and why they are useful
tags: Cypress
publishedDate: 29/11/2020
published: true
---

# Component commands

When writing E2E tests you want to abstract the selection of elements, as the selectors can be brittle and the more instances of them there are the harder it is to update them. This abstraction can happen in a few different ways. For example, page objects or [component test harnesses](https://material.angular.io/cdk/test-harnesses/overview), the most common cypress way of doing this is to use [custom commands](https://docs.cypress.io/api/cypress-api/custom-commands.html).

Component commands are custom commands that expose functions and getters for a component.

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

    get title(): string {
        return this.element.text().trim();
    }
}

export class SharedTable {
    constructor(public element: JQuery) {}

    getColumn(index: number): Column {
        const element = this.element.find('th').eq(index);
        return new Column(element);
    }
}

Cypress.Commands.add('sharedTable', () => Cypress.get('table').then(e => new SharedTable(e)));
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

```ts
type MethodKeys<T> = ({ [P in keyof T]: T[P] extends Function ? P : never })[keyof T];
type Methods<T> = Pick<T, MethodKeys<T>>;
type PropKeys<T> = ({ [P in keyof T]: T[P] extends Function ? never : P })[keyof T];
type Props<T> = Pick<T, PropKeys<T>>;

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      prop<S extends keyof Subject, P extends Props<Subject>, K extends keyof P>(
          property: K
      ): Chainable<Subject[S]>;
      map<F extends Methods<Subject>, K extends keyof F>(method: K, ...arrgs: any[]): Chainable<any>;
      elementMap<T extends Chainable<JQuery>>(method: T, ...arrgs: any[]): Chainable<any>;
      tap<F extends Methods<Subject>, K extends keyof F>(method: K, ...arrgs: any[]): Chainable<Subject>;
      elementTap<T extends Chainable<JQuery>>(method: T, ...arrgs: any[]): Chainable<Subject>;
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