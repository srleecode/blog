---
title: Using affected to run targeted CI and CD operations
description: Reducing the time and resources taken to run CI and CD operations can improve release velocity and improve the development process as a whole. One of the best ways to do this is by using affected to only run the CI and CD operations for the code that has changed
tags: Software development
publishedDate: 28/3/2020
published: true
---

# Using affected to run targeted CI (build, lint and test) and CD operations

As web applications grow in size, so too does the time and resources required to build, serve and test them. A standard web application will need to build, serve and run tests across the whole application. This approach doesn't scale and, therefore, as the application grows velocity is increasingly impacted. Testing and serving the application can take time and since these things happen multiple times a day it leads to larger and larger impacts over time. It is the same situation with CI and CD, deploying and testing the application means that the whole application needs to be deployed and tested. This means that the time required for CI and CD operations will continue to grow. A better and more scalable approach is to have these operations targeted to only the parts of the code that have changed.

How to implement:

- Use [nrwl nx](https://github.com/nrwl/nx) to split up the application into separate libraries. Nx has a suite of tools that allow running build, lint, test and E2E test operations on only the parts of the code that have changed.
- Use [Wallaby js](https://wallabyjs.com/) or [vscode-jest](https://github.com/jest-community/vscode-jest) to run the tests for only the parts of the code that have changed. These tools calculate and run the minimum set of tests affected by your code changes; often only a single test needs to be run..
