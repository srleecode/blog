---
title: Change isolation strategies
description: Description, advantages and disadvantages of the different change isolation strategies
tags: Software development
publishedDate: 23/5/2020
published: true
---

# Change isolation strategies

In order to not impact the testing of other changes, changes should be isolated until an appropriate level of testing has been completed on them. This includes integration or smoke tests in a real environment. Below is a discussion of the different strategies that are available to isolate changes.

## Feature flags

Feature flags (also known as feature toggles or feature switches) are a software development technique that turns certain functionality on and off during runtime, without deploying new code. This allows for better control and more experimentation over the full lifecycle of features.

The idea behind feature flags is to build conditional feature branches into code in order to make logic available only to certain groups of users at a time. If the flag is “on,” new code is executed, if the flag is “off,” the code is skipped.

Benefits:

- Ability to put unfinished code into production. This enables smaller and more frequent releases
- Ability to turn features on and off at any moment. If you introduced a bug in production, you could turn that feature off
- Reduces or eliminates the necessity to create long running branches. This means less or no complex and difficult merges
- Ability to enable a feature for only one group of users. For example, you can enable a feature for a specific region, role, user group or any other rules you need

Disadvantages:

- Can be difficult to manage and any complex application using feature flags will need to use a feature flag management system. For example, extra work is required to expire and remove feature flags that are no longer used. See [feature flag code smells](https://scottlee.netlify.app/posts/feature-flag-code-smells) for more information on how to correctly handle feature flags
- Feature flags introduce more code and complexity into the application both for flagging logic and for keeping the old code that is being transitioned
- You need to test the flag or toggle points appropriately which leads to more tests being required

## Custom routes

Custom routes or feature branching is when each parallel team of developers each get their own branch of the main code to develop new features within and each is then merged into the main code once line it is completed. These feature branches are normally deployed into their own separate custom routes so that they can be tested in real environments before they get merged into the main code.

By isolating each feature branch, new features can't interact with one another until they are merged into the main code line. This approach allows each feature to be developed without the possibility of inadvertently affecting the progress of other developers or teams, but it also means that each team is blind to the changes the other teams are making that might affect them.

Benefits:

- Less code complexity when compared to feature flags
- Can be applied to all types of changes. Changes that are good for feature flags require a few number of points in the code where you can toggle the feature on and off

Disadvantages:

- merge hell. Merging a long running feature branch back into the main branch causes merge conflicts which can take a long time to resolve and are risky to resolve
- You can't do integration of all the changes until a later stage
- Need to manage and delete custom routes that are no longer in use
- Custom routes lead to long running branches. The longer a branch lives separate from the main branch the high the risk for merge conflict and deployment challenges. Short lived branches promote cleaner merges and deploys. Short lived branches also enable better communication. A developers primary form of communication with other developers is the source code. It doesn't matter how often you have standup meetings when it comes to central method of communication long running branches represent dead silence

## [Deploy urls](https://scottlee.netlify.app/concepts/deploy-urls)

A deploy url could be considered as a short lived custom route that is create when a pull request is created and removed when it is merged.

Large projects normally operate by merging their code into a develop or integration branch and then running manual QA and E2E tests on that branch. This is problematic because it destabilizes the integration branch. Manual QA and E2E tests are the only tests that are run on a real environment and so they are the tests that give the most confidence that the code is working as expected. Merging code that has not yet passed these tests is likely to be merging code that will need to be reworked due to bugs or missed requirements. This is going to cause rework which impacts velocity as it necessitates context switching. Context switching severely impacts productivity as it impedes flow. A very unstable integration branch is also going to cause issues for other developers.

An alternative to merging and then running the E2E and manual QA tests is creating a deploy url which provides a custom route that links to the deployed code in the users branch. A deploy url allows a series of automated and manual assurance checks to be run against a real environment before the code gets merged.

Benefits:

- Allows testing in a real environment, e.g. integration or smoke testing, before the code gets merged

Disadvantages:

- Needs to be setup
- Can slow down the pull request process if attention is not paid to the performance of the CI and CD jobs

## Deploying to a lower environment

One way to isolate changes in terms of environments not source code is to deploy to a lower environment, e.g. sit, and only allow deploying to higher environment once integration testing has passed.

Disadvantages:

- Cumbersome as you need to deploy the same code across multiple environments. You also need to line up all the different changes across your application and deploy them together only when they are all passing. This leads to larger releases with greater levels of change management

# There is no silver bullet

Feature flagging and feature branches using custom routes are both ways to decouple parallel code changes and allow teams to release changes with less coordination overhead. Feature branches are easy to get started with, but lead to painful merge conflicts. The risk of merge conflicts tends to also disincentive making incremental improvements to a codebase. Feature flags allow teams to practice true continuos integration and totally decouple code changes from feature releases, at the cost some complexity in implementing the flagging logic. In a complex application, both approaches will be used. The goal is to choose the right strategy for the situation at hand.

Flags lend themselves best to a new feature or alternative feature where access to the feature can be controlled from a single point in the code - often by showing or hiding a button or page. Other types of work, such as internal refactoring across multiple areas in the app is hard to protect behind a flag. For that type of work, consider using a feature branch, ideally breaking the work down into smaller chunks that can be implemented incrementally in a series of branches rather than one long-lived branch. This will reduce the risk of a large merge conflict at the end when the branch is merged back into the main code.
