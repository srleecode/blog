---
title: Create lean components
description: Components should be lean and business logic should be extracted into the service layer
category: Architecture
publishedDate: 14/2/2020
published: true
---

# Create lean components

## Problem

With Angular we are creating applications using a layered architecture. Every layer in our application should have its own responsibility. This means we have decoupled layers and each with its own concern.

The [official architecture guide](https://angular.io/guide/architecture-services) reads:

> Angular distinguishes components from services to increase modularity and reusability. By separating a component’s view-related functionality from other kinds of processing, you can make your component classes lean and efficient.

> Ideally, a component’s job is to enable the user experience and nothing more. A component should present properties and methods for data binding, in order to mediate between the view (rendered by the template) and the application logic (which often includes some notion of a model).

Business logic in our application does not belong in the component layer. The component layer is purely meant to be used for visualization, displaying user interface and handling user input. Therefore, business logic should be extracted into the service layer.

## Solution

A component can delegate business logic tasks to services, such as fetching data from the server or handling state updates and processing. Even with components split into container components and presentational components, we should still add another layer of abstraction to prevent components from doing too much. Business logic should be extracted into component level services or even component-specific services such as facades.

## Resources

- [Lean Angular components](https://indepth.dev/lean-angular-components/)
- [Delegate complex component logic to services](https://angular.io/guide/styleguide#delegate-complex-component-logic-to-services)
