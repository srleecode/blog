---
title: Provide types for everything
description: Using types gives us type safety. Therefore, they should be used whenever possible
category: Readability
publishedDate: 14/2/2020
published: true
---

# Provide types for everything

## Problem

TypeScript allows us to write code that is statically type checked. This provides huge benefits. It helps us during development with auto completion, it simplifies working with third party libraries, helps us to refactor our code, spots errors during development that would have otherwise been runtime errors and much more.

If we start using the `any` type, we lose all these benefits.

## Solution

The solution is to avoid the `any` type wherever possible in our code and we should define proper types instead.

We should define our models or DTOs (Data Transfer Objects) as interfaces instead of classes. Interfaces are virtual structures that only exist within the context of TypeScript. This means an interface does not generate code whereas a class is primarily syntactical sugar over JavaScript's existing prototype-based inheritance. Consequently, a class generates code when it's compiled to JavaScript.

For example, if we make a backend request that will return an a user object with the properties `userName` and `password`, both strings, we can define an interface `User` that describes the shape of the response:

```ts
export interface User {
  userName: string;
  password: string;
}
```

Types should also be created for events. When using event, it is important to add type information so TypeScript knows the structure of the objects we are dealing with. By providing the type right at the boundary, TypeScript is able to infer it everywhere else where that variable is being used.

For example when working with custom events:

```ts
@Component({
  template: `<some-other-component (someEvent)="someEventHandler($event)"></some-other-component>`
})
export class SomeComponent {
  someEventHandler(event: TypeForThisEvent) {
    ...
  }
}
```

`TypeForThisEvent` will make sure that the non-typed HTML event is typed inside of our TypeScript code.
