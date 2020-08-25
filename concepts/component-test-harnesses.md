---
title: Component test harnesses
description: A component test harness is an alternative to using ids. It is especially useful for consuming libraries as they can define their test harness.
tags: Software development
publishedDate: 28/3/2020
published: true
---

# Component test harnesses

When writing tests for components we usually require a CSS query selector to select elements normally using an id or data attribute. Querying components by using CSS selectors is bad for multiple reasons;

1. We need to understand the components. To find a particular element, we need to dive into its internals.
2. Internal DOM structure of the components can break the tests.

A common approach to partially alleviate these issues in E2E tests is the page object model. The “Harness concept” is inspired by the PageObject pattern. A harness class lets a test interact with a component over an official API. By using component harnesses a test isolates itself against the internals of component library and resists internal refactorings.

Useful links:

- [Test-harnesses](https://material.angular.io/cdk/test-harnesses/overview)
- [Test your components with Angular Material’s component harnesses](https://medium.com/@kevinkreuzer/test-your-components-using-angular-materials-component-harnesses-f9c1deebdf5d)
- [Component Test Harnesses: Angular 9's Second Best Feature](https://medium.com/@mhamel06/component-test-harnesses-angular-9s-second-best-feature-4261cabedc77)
