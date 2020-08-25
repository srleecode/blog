---
title: Visual regression
description: Visual regression testing tools performs UI regression testing by capturing the screenshots of the UI and comparing them with the original images.
tags: Software development
publishedDate: 28/3/2020
published: true
---

# Visual regression

Visual regression testing tools performs UI regression testing by capturing the screenshots of the UI and comparing them with the original images. There are many tools in the market. Most of the more sophisticated tools that are available are cloud based and involve costs. I think it would be good idea for someone to do an investigation on the available tools and to decide on one that all teams will be able to use as I presume that it would take a long time to set up the ability for us to be able to use one of these tools.

The more sophisticated tools are better because they lead to less brittle tests. Most tools compare pixels exactly and this causes false positives. These false positives are one of the biggest challenges with visual regression testing. It is common in visual regression testing for two screenshots of a UI to appear entirely identical to a human, but be picked up as different due to the naive 1:1 diffing algorithms that are used for the visual comparison. Since different browser versions and devices render things slightly differently false positives can easily happen. Two ways visual regression tools get around this is by:

- Using a combination of machine learning and heuristics to train the tool so that it can determine what is and is not an acceptable variation.
- Running tests in a Docker container to avoid the one-pixel differences when tests are run in non-identical environments.

Capturing the images is best done using storybook. Storybook’s web server supports the ability to render a component story standalone, in any particular state, without any of the Storybook layout elements. With these special URLs you can either create your own screenshots and diff them or use a library which does that work for you.
