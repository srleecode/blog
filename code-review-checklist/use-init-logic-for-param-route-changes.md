---
title: Use init logic for params route changes
description: By preloading routes applications can appear to be more responsive for users
category: Router
publishedDate: 14/2/2020
published: true
---

# Use init logic for params route changes

## Problem

Angular does not allow you to reload the component when the parameter in the route changes. For example, with the route /user/:id the first load with ( /user/1 ) will work, but when the id changes ( /user/2 ) Angular just updates the URL and ngOnInit will not run on the component.

## Solution

The solution is to listen to the router parameter changes and run the required initialisation logic then.

```ts
ngOnInit() {
	this.activeRoute.queryParams.subscribe(queryParams => {
		// do something with the query params
	});
	this.activeRoute.params.subscribe(routeParams => {
		this.loadUserDetail(routeParams.id);
	});
}
```

## Resources

- [Reloading Components when change in Route Params](https://medium.com/@mvivek3112/reloading-components-when-change-in-route-params-angular-deed6107c6bb)
