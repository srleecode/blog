---
title: Deploy urls
description: A deploy url allows a series of automated and manual assurance checks to be run against a real environment before the code gets merged.
tags: Software development
publishedDate: 28/3/2020
published: true
---

# Deploy urls

Large projects normally operate by merging their code into a develop or integration branch and then running manual QA and E2E tests on that branch. This is problematic because it destabilizes the integration branch. Manual QA and E2E tests are the only tests that are run on a real environment and so they are the tests that give the most confidence that the code is working as expected. Merging code that has not yet passed these tests is likely to be merging code that will need to be reworked due to bugs or missed requirements. This is going to cause rework which impacts velocity as it necessitates context switching. Context switching severely impacts productivity as it impedes flow. A very unstable integration branch is also going to cause issues for other developers.

An alternative to merging and then running the E2E and manual QA tests is creating a deploy url which provides a custom route that links to the deployed code in the users branch. A deploy url allows a series of automated and manual assurance checks to be run against a real environment before the code gets merged. These checks include, but are not limited to:

- Browser Testing - simulating user journeys and real interactions
- Screenshot Testing - to automatically prevent visual regressions
- HTTP Assertion Testing - requesting APIs or pages and verifying the outputs
- Manual QA - with designated reviewers who approve the PR.

<img class="nx-jangular-blog-centered-image nx-jangular-blog-centered-image--large" src="/assets/deploy-url.png">

A deploy url sacrifices some confidence in the E2E and manual tests due to them not being run against the integration branch. This means there could be other code in development that could cause an impact, but is not in the branch being tested. To alleviate this issue the branch being tested should always be kept up to date and small releases should be used to ensure that the work in progress code is limited. Further tests should also be carried out once the merge occurs.
