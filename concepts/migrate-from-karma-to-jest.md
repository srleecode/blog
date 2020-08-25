---
title: Migrate from karma to jest
description: Isolated tests can be written without Testbed and adding Testbed only makes the tests slower 
tags: Software development
publishedDate: 28/3/2020
published: true
---

# Migrate from karma to jest

By default, the Angular CLI provides Karma as a test runner and Jasmine as the test framework. As of Nx v6.3, Nx offers the choice of using Jest for both instead. Jest is often faster than Karma and makes it easier to run changes only for the parts of the code that has changed.