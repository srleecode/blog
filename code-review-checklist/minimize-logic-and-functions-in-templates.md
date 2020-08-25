---
title: Minimize logic and functions in templates
description: Expressions in templates are harder to test and run on each change detection cycle. Therefore, try to avoid them.
category: Performance
publishedDate: 14/2/2020
published: true
---

# Minimize logic and functions in templates

## Problem

Template expressions are a piece of executable code supported by Angular. They are between the double curly braces `{{}}`. Whenever the view of a component is rendered the template expressions are evaluated and their results are appended to the DOM using interpolation. If we run heavy template expressions, template expressions like method/function calls that take longer to execute.

When we put too much logic in our templates, we are also making our applications more difficult to test. The fastest way to write and execute tests is to use simple unit tests. Of course we could also test a component's template with a unit test but that increases the complexity and introduces some challenges we have to deal with. In addition, too much logic inside the template makes them less readable. We cannot take a quick glance at the template and quickly understand what's going on.

## Solution

Try to avoid putting too much logic in your templates.

For example here, we have have an `*ngIf` that has too much logic.

```ts
@Component({
  template: `
    <div *ngIf="users && users.length > 1 && visible">content to show</div>
  `
})
export class SomeComponent {
  users: User[];
  visible: boolean;
}
```

We can refactor this by extracting the logic into the component's class. This will make the template more readable and the logic easier to test.

```ts
@Component({
  template: `
    <div *ngIf="usersExistsAndVisible()">content to show</div>
  `
})
export class SomeComponent {
  users: User[];
  visible: boolean;

  usersExistsAndVisible() {
    return this.users && this.users.length > 1 && this.visible;
  }
}
```

An even better approach is to calculate the value, save it and then refer to it. This is a better approach because it is more performant. Functions in the template will be called in each change detection cycle as Angular has no way to determine if the expression value has changed or not. To avoid the expression being called on each change detection cycle you can:

- Calculate the variable and save it in OnChanges
- Calculate the variable in a parent component and pass it in as an Input
- Calculate the variable using a pure pipe

## Resources

- [Put presentation logic in the component class](https://angular.io/guide/styleguide#put-presentation-logic-in-the-component-class)
