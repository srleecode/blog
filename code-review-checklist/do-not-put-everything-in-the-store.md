---
title: Do not put everything in the store
description: Use SHARI (Shared, Hydrated, Available, Retrieved, Impacted) to determine what items to put into the store
category: ngrx
publishedDate: 14/2/2020
published: true
---

# Do not put everything in the store

## Problem

`@ngrx/store` (or Redux in general) provides us with a lot of great features and can be used in a lot of use cases. But sometimes this pattern can be an overkill. Implementing it means we get the downside of using Redux (a lot of extra code and complexity) without benefiting of the upsides (predictable state container and unidirectional data flow).

## Solution

The NgRx core team has come up with a principle called **SHARI**, that can be used as a rule of thumb on data that needs to be added to the store.

- Shared: State that is shared between many components and services
- Hydrated: State that needs to be persisted and hydrated across page reloads
- Available: State that needs to be available when re-entering routes
- Retrieved: State that needs to be retrieved with a side effect, e.g. an HTTP request
- Impacted: State that is impacted by other components

## Resources

- [Reducing the Boilerplate with NgRx](https://www.youtube.com/watch?v=t3jx0EC-Y3c) by Mike Ryan and Brandon Roberts
- [Do we really need @ngrx/store](https://blog.strongbrew.io/do-we-really-need-redux/) by Brecht Billiet
- [Simple State Management with RxJS’s scan operator](https://juristr.com/blog/2018/10/simple-state-management-with-scan/) by Juri Strumpflohner
