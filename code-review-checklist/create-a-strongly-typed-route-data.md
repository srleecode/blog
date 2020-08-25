---
title: Create a strongly typed route data
description: In Angular we use typescript which has static typing, but we don't get this static typing on routes by default. It is a good idea to add it.
category: Router
publishedDate: 1/6/2020
published: true
---

# Create a strongly typed route data

## Problem

One of the most important features in Typescript is static typing. You don’t need to remember all the class, method, and variable names, in order to use them. Just start typing and thanks to incredible Typescript and IDE Editors suggestions will pop-up, that fit your needs.

Because of Angular uses Typescript internally, we get the same benefits. But there are some annoying exceptions, where there is no static typing at all. One major example is the Data Property inside Route Object.

Whenever we need to add some unique property to the route object, we need to pass it by the Data object.

a Data Object is any type.

## Solution

To add typing to routes we create a new type

```ts
export type RouteData = {
  title?: string;
  permission?: string[];
};

export type AppRoute = Route & {
  data?: RouteData;
};
```

Now in your route guards use RouteData and in your route definitions use AppRoute or AppRoute[] and you will have types for your route data.

## Resources

- [Creating a Strongly Typed Route Data Parameter in Angular](https://medium.com/weekly-webtips/creating-a-static-route-data-parameter-in-angular-41f26ac208d)
