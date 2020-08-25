---
title: Use descriptive file names
description: The descriptive name of a file should describe the component's feature.
category: Architecture
publishedDate: 14/2/2020
published: true
---

# Use descriptive file names

## Problem

When applications grow over time, it can be quite hard to identify and find certain parts in our application. When we don't give a descriptive name to our files, this makes it even more difficult to do so.

## Solution

### Separate file names with dots and dashes

It is recommended to separate words with dashes and dots to separate the descriptive name from the type. The descriptive name of a file should describe the component's feature.

Also, try to use conventional suffix that describe the type of the file, e.g. `.component.ts`, `.directive.ts`, `.service.ts`, `.module.ts`, `.pipe.ts`. Use `.model.ts` for interface files.

Here are a few examples:

- `app.component.ts`
- `contacts.service.ts`
- `product-list.component.ts`

Using such naming convention helps to provide a consistent way to find content very quickly and easily. Consistency will save you time and make you and your team more efficient.

### Use the name and type of the file for your class names

If the file you are working on is `app.component.ts` it is obvious that this must be a component. It also tells us the name of this component, which is `app`. This means we'd call our class `AppComponent`:

```ts
@Component({ ... })
export class AppComponent { }
```

Here's another example of a class defined in `product-list.component.ts`:

```ts
@Component({ ... })
export class ProductListComponent { }
```

## Resources

- [General Naming Guidelines](https://angular.io/guide/styleguide#general-naming-guidelines)
