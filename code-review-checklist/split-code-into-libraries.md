---
title: Split code into libraries
description: Split code into libraries using nrwl nx rather than feature modules
category: Architecture
publishedDate: 14/2/2020
published: true
---

# Split code into libraries

## Problem

As web applications grow in size, so too does the time and resources required to build, serve and test them. A standard web application will need to build, serve and run tests across the whole application. This approach doesn't scale and, therefore, as the application grows velocity is increasingly impacted. Testing and serving the application can take time and since these things happen multiple times a day it leads to larger and larger impacts over time. It is the same situation with CI and CD, deploying and testing the application means that the whole application needs to be deployed and tested. This means that the time required for CI and CD operations will continue to grow. A better and more scalable approach is to have these operations targeted to only the parts of the code that have changed.

## Solution

Use [nrwl nx](https://nx.dev/web) to split up the application into separate libraries. Nx has a suite of tools that allow running build, lint, test and E2E test operations on only the parts of the code that have changed.

When creating libraries, use the following tags:

- app: for the application the library is for
- scope for the domain the library is for, e.g. account-groups. The scope name should be all the grouping folders, e.g. if it is a domain account-groups under an app called calculator it would be calculator-account-groups.
- type for the type of content in the library, e.g. ui

There are five types of different content for libraries:

- feature: for smart components (containers)
- ui: for dumb components
- data-access: for state management and services
- util: for model files, constants, validators, pipes and any other miscellaneous items, e.g. shared functions.
- shell: for wrapping different libraries and exposing them as a single library. Also, for routing.

Libraries are contained within grouping folders. For example a library could be in the folder help-desk/account-groups/ui. In this case there are two grouping folders: one for the application (help-desk) and one for the domain (account-groups). The library name is ui.

### What if something needs to be reused in multiple libraries?

Any library can be imported by other libraries. There are, however, two types of domains in which libraries tend to get imported into many more different libraries than normal domains do. These are:

- shared - domains that are common and apply across different applications. An example would be shared/table for libraries related to a table component that could be used across many different applications.
- application/shared - this is for content that cannot easily be given a domain or for which a domain would be too small, e.g. one or two files, and would therefore cause overhead if it was split out. As with all libraries, care should be taken that their content is split out appropriately into the right domains. If one library gets too large, then it will be frequently updated. Extra care should be taken with these shared libraries as it is likely that are used by many different libraries which means a large number of libraries are affected when they are updated.

## Resources

- [Targeted build, lint, test and E2E test operations](https://scottlee.netlify.com/posts/retaining-velocity#targeted-build-lint-test-and-e2e-test-operations)
