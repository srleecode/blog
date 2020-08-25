---
title: Nrwl nx
description: Nx is a set of Angular CLI generators, linters, and runtime libraries eliminating a lot of the speed bumps teams face when building ambitious Angular applications.
tags: Software development
publishedDate: 28/3/2020
published: true
---

# Nrwl nx

Nx is a set of tooling that allow the development of monorepos. Google, Facebook, Microsoft or Twitter are known for having huge repositories containing most of the company’s source code. Rather than having one git repository per project/application, there’s just one single repository containing all (or at least a logically grouped set) of the projects and applications. The reason is simple: allowing teams to move fast by avoiding additional overhead caused by version management and integration. In a monorepo, you share code by just linking libraries, there’s no need to release and publish them first. Just think about some API refactoring. If you distribute libraries over package managers, making substantial changes is getting really hard. It’s still tough in a monorepo, but basically all of the code is in your IDE. So you can just refactor in a branch, launch tests and fix the broken code.

Nx tooling allows:

- affected commands. Nx has a suite of affected commands that allow running build, lint, test and E2E test operations on only the parts of the code that have changed. Building or testing the entire repo in your CI build is often not feasible as it would take too much time (and thus break the benefit of having short feedback cycles).The nx affected commands are enabled through splitting the code into libraries. When an application has been split into libraries, nx can analyse the codebase to build a dependency graph behind the scenes. It uses this graph to look at changes and discover the affected apps and libraries. Knowing the affected parts of the code means that build, lint and test operations only need to happen for these affected parts of the code which dramatically reduces build, lint and test times.
- Nx Console - this is a Visual Studio Code extension for Angular and Nx. It is a GUI that automatically finds available schematics in your workspace, thus allowing you to easily control and execute Angular CLI / Nx commands from a UI rather than directly through the CLI.
