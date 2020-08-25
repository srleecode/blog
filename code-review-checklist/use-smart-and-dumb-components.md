---
title: Use smart and dumb components
description: Dumb components should be used as they have benefits in terms of change detection.
category: Architecture
publishedDate: 14/2/2020
published: true
---

# Use smart and dumb components

## Problem

Performing a deep comparison of objects in JavaScript is a quite costly operation. Reference checks however, are extremely fast and easy. If you embrace immutability, then it makes it easier to use dumb components (component with the change detection strategy is OnPush). Immutability means that we will never mutate objects. Instead, if we need to update state or some object properties, we first copy the object and then make our changes.

Here are some examples of things that don't work properly when mutating objects are:

- `OnPush` ChangeDetectionStrategy in Angular
- NgRx selectors
- RxJS operators such as `distinct`, `distinctUntilChanged`, `tap`, ...

Working in an immutable way can be done using the spread operator or using one of a range of libraries that can help us to work immutable that will be more performant for big collections, for example [Immutable.js](https://facebook.github.io/immutable-js/), [Immer](https://github.com/mweststrate/immer) or [Seamless Immutable](https://github.com/rtfeldman/seamless-immutable). The point here is that we should embrace immutability and try to avoid mutating objects, regardless of how you accomplish this.

## Solution

The most advocated way to lay out your components is to use smart and dumb components (there is a variety of other names for this principle but the general idea is the same).

### Component Types

#### Dumb Component

Dumb components are components with the On Push change detection strategy:

```ts
@Component({
  ...
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

Change detection (CD) in Angular is performed from top to bottom. This means that everything is only checked once. This is a huge difference compared to AngularJS where change detection was performed in cycles until everything was considered stable.

However, it still means that everything is checked every time CD is triggered, even things that we know for sure have not changed. With the `OnPush` strategy, the component (and all of its children!) will only be checked if one of its `@Input`s have changed (reference check) **or** if an event was triggered within the component.

This means that we can easily tell Angular to not run CD for huge parts of our component tree, speeding up CD a lot

Dumb components are simple presentational components and have the following features:

- Receive data through `@Input`s and communicates only with it's direct parent through `@Output`s.
- Dumb components should not receive `Observables` as inputs.
- They do not know about the rest of the application and hence does not know where they are being used.
- Can contain business logic, but only logic that belongs to the scope of this component. For example, a pagination component can contain logic to calculate the number of 'boxes' to show. It does not know what happens when a user clicks a page number. In that case, it would emit a custom event to notify its parent that something has happened. The parent component then decides what to do and takes action.
- They can use other dumb components as children.
- They can inject services that are related to the view layer of your application (think `TranslateService`, `Router`, ...) but never services that handle business logic such as fetching data.

#### Smart Component

- Smart components are application-level components.
- They pass data down to dumb components as much as possible
- They compose several other dumb components in its template.
- They listen for events emitted by dumb components and perform the required action.

Benefits:

- Dumb components are completely reusable since they have a defined API and are independent of any business logic.
- Dumb components are easy to test as they are completely isolated.
- The entire architecture of your components becomes easier to reason about. If there is problem with business logic or if the data is not correctly fetched, you know that you need to start searching in your smart components since this is their only responsibility.

## Resources

- [Presentational and container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) by Dan Abramov
- [Smart components vs presentational components](https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/) by Angular University
- [The smart vs dumb component quiz](https://blog.strongbrew.io/the-smart-vs-dumb-components-quiz/) by Kwinten Pisman
- [Change Detection in Angular](https://vsavkin.com/change-detection-in-angular-2-4f216b855d4c)
