---
title: Release resources in ngOnDestroy
description: Use ngOnDestory to release resources to avoid memory leaks and other undesirable bea
category: Performance
publishedDate: 14/2/2020
published: true
---

# Release resources in ngOnDestroy

## Problem

When creating Angular components, we need to use resources to get user input, fetch data from the backend, create animations, etc. The way we do this varies. We could use Observables, browser APIs, event listeners or other means. When using resources, we also need to release those resources when they are no longer required. If we do **not** do this, we might introduce memory leaks which will make our application crash and introduce other unwanted behavior.

When creating Angular components, we need to use resources to get user input, fetch data from the backend, create animations, etc. The way we do this varies. We could use Observables, browser APIs, event listeners or other means. When using resources, we also need to release those resources when they are no longer required. If we do **not** do this, we might introduce memory leaks which will make our application crash and introduce other unwanted behavior.

In Angular, everything async is handled by Observables, so it is common to subscribeto observables. Whenever we do so, it is very important to also unsubscribe. Unsubscribing will clean up the resources being used by this stream. If we neglect to do this, we might introduce memory leaks. If we manually subscribe, it also means that we have to manually unsubscribe. This is something that is easily forgotten.

## Solution

For every component and directive, Angular offers lifecycle hooks that provide visibility into key life moments of a component, such as creation, rendering, or when data-bound properties have changed.

In order to release our resources, we can hook into the `ngOnDestroy` lifecyle of a component. This hook is called **before** a component is destroyed and removed from the DOM.

In the following example, we set up a function to be executed every 5000ms using the `setInterval` API. Inside `ngOnDestroy`, we clear the interval and release the resource.

```ts
@Component({
  ...
})
export class SomeComponent implements OnInit, OnDestroy {
  intervalId;

  ngOnInit() {
    this.intervalId = setInterval(() => {...}, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
```

An alternative to manually subscribe to Observables is to use the `async` pipe provided by Angular.

The async pipe will:

- subscribe to an Observable
- unsubscribe from the Observable when the component is destroyed by hooking into the `onDestroy` hook
- mark this component as "to be checked" for the next change detection cycle

Using the `async` pipe as much as possible will make sure all the resources are cleaned up properly and reduce the likelihood of memory leaks.
