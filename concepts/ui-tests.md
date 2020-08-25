---
title: UI tests
description: Reducing the time and resources taken to run CI and CD operations can improve release velocity and improve the development process as a whole. One of the best ways to do this is by using affected to only run the CI and CD operations for the code that has changed
tags: Software development
publishedDate: 28/3/2020
published: true
---

# UI Tests

In an E2E test, you often need to perform many operations before you get to the actual test itself, e.g. login and page navigation. These extra operations make these tests extremely expensive and leads to have an extremely large area of code under test which leads to greater chances of tests failing for reasons unrelated to the what the test is actually checking.

UI tests are a less expensive alternative to E2E tests that retain one of their main advantages⁵ which is fidelity while skipping their major costs which are due to precision. Fidelity is about how closely the tests resemble a user's experience with the application. Precision is about how well a test can target a specific use case without executing (or re-executing) unrelated code. Precision is valuable because it means the tests will be faster and more reliable. The larger a test is the more [likely](https://testing.googleblog.com/2017/04/where-do-our-flaky-tests-come-from.html?m=1) it is that it will be flaky.

By using UI tests we don't get rid of E2E tests. We instead find another level in which to test things at appropriately. The best way to make tests fast is to make them targeted, i.e. the code under test should only be the code required to pass the test. E2E tests are useful because they show that everything wires up and works together, but they are slow because they are run against the whole application. Once you have covered the happy path cases with E2E tests the value vs. costs for other E2E tests is small.

UI tests are written using [storybook](https://blog.nrwl.io/ui-testing-with-storybook-and-nx-4b86975224c)

## storybook

Storybook enables developers to develop and test components in isolation to understand component behavior under different conditions. It decreases visual development iterations by allowing the ability to test multiple component views without the need for a data connection. Storybook is an open source tool for developing UI component explorers. Storybook provides a sandbox to build UI components in isolation so you can develop hard-to-reach states and edge cases. Story book allows you to run UI tests and visual regression tests against its generate app¹. It also helps with the development of the components because it allows you to develop and design UI components outside your app in an isolated environment. Developing UI components in isolation makes it drastically easier to develop hard to reach states and edge cases which in turn results in more durable components

Useful links:

- [Example storybook component explorer site](https://github.com/Esri/calcite-app-components)
- [The crucial tool for modern frontend engineers](https://blog.hichroma.com/the-crucial-tool-for-modern-frontend-engineers-fb849b06187a)
- [The delightful storybook workflow](https://blog.hichroma.com/the-delightful-storybook-workflow-b322b76fd07)

---

¹

<img class="nx-jangular-blog-centered-image nx-jangular-blog-centered-image--large" src="/assets/test-types-differences.png">

Visual regression testing tools perform UI regression testing by capturing the screenshots of the UI and comparing them with the original images. There are many [tools in the market](https://storybook.js.org/docs/testing/automated-visual-testing/).

The more sophisticated tools are better because they lead to less brittle tests. Most tools compare pixels exactly and this causes false positives. These false positives are one of the biggest challenges with visual regression testing. It is common in visual regression testing for two screenshots of a UI to appear entirely identical to a human, but be picked up as different due to the naive 1:1 diffing algorithms that are used for the visual comparison. Since different browser versions and devices render things slightly differently false positives can easily happen. Two ways visual regression tools get around this is by:

- Using a combination of machine learning and heuristics to train the tool so that it can determine what is and is not an acceptable variation.
- Running tests in a Docker container to avoid the one-pixel differences when tests are run in non-identical environments.

Capturing the images is best done using storybook. Storybook’s web server supports the ability to render a component story standalone, in any particular state, without any of the Storybook layout elements. With these special URLs you can either create your own screenshots and diff them or use a library which does that work for you.
