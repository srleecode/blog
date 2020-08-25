---
title: Minimise code under test
description: Fast feedback is vital and this can only happen when you minimise the code under test
tags: Software development
publishedDate: 6/8/2020
published: true
---

# Minimise code under test

One of the principles that should be followed when writing tests is that while you should be trying to have a complete set of tests you should also be seeking to minimise the code under test. If you use more code then you need, your tests are going to be more brittle and take longer to run. This makes them less useful as faster feedback is always better. Some good practices that arise from this principle are:
 - Only using E2E tests for the happy path scenarios. Exception testing can happen in the [UI tests](https://scottlee.netlify.app/concepts/ui-tests)
 - [Not using test bed](https://scottlee.netlify.app/concepts/isolated-tests-dont-need-testbed) when it is not required, e.g. class based tests
 - Reducing the tests run and code compiled to only the parts of the app that are relevant to the code that has [changed](https://scottlee.netlify.app/concepts/using-affected-to-run-targetted-CI-and-CD-operations)
 - Removing tests when they are no longer needed or provide no value