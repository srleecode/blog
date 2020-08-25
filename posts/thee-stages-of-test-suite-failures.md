---
title: Three stages of test suite failures
description: A look at the three stages of test suite failure and how each one causes a regression to a lower quality stage
tags: Software development
publishedDate: 23/5/2020
published: true
---

# Three stages of test suite failures

## Stage 1 - no tests or missing tests

This stage is the most obvious in its problematic nature. No tests mean that you can't be sure that what you have developed will work and will not be broken by further changes. A consequence of a test suite in this stage will be bugs occurring in production.

## Stage 2 - too many manual tests

The costs in this stage are more hidden than the first, but are still substantial. The costs are mainly in terms of waste and an increasing complexity in tasks unrelated to delivering value to the customer, e.g. more manual tests mean they take longer to run and require more resources to run which leads to larger releases which are harder to manage. See [regression death spiral](https://scottlee.netlify.app/posts/regression-death-spiral) for a deeper explanation of the costs associated with this stage.

At this stage it is common for the test suite to become too expensive which causes a regression to the previous stage as tests get missed or abandoned.

## Stage 3 - unfocused tests

Tests are costly and are only valuable when their costs are offset by the usefulness of their feedback. Tests with a high return on investment minimize the amount of code under test and only run when their feedback will be valuable, see [the value of a tests feedback](https://scottlee.netlify.app/posts/the-value-of-a-tests-feedback) for a deeper explanation of what makes a tests feedback valuable. Unfocused tests have a low return on investment.

Unfocused tests have more code under test than is strictly required and this leads to many disadvantages:

- it causes the tests to take longer to run
- it causes the tests to be more complicated making them harder to maintain and read
- it increases the areas in which a test can break making them more brittle. Tests are meant to protect you from changes by verifying that some certain conditions have not changed. A test is unuseful if it is verifying that something that you expect could change has not changed, e.g. implementation details.
- it causes the tests feedback to be less useful to developers¹ as the error descriptions are also unfocused, see [what makes a good test suite](https://scottlee.netlify.app/posts/what-makes-a-good-test-suite) for an explanation of the importance of error descriptions.

At this stage it is common for developers to feel the pain of writing tests and to avoid writing them which leads to a regression to stage 1 or 2.

---

¹

In test suites, we have two types of tests that provide different types of feedback:

- Customer Tests which help the customer feel comfortable that we have built the feature that they have asked for
- Programmer Tests help the developers feel comfortable that they understand the behavior of each part of the code and can change it with confidence and ease.

These two kinds of tests happen to compete with each other: Customer Tests generally need to be long, run the whole system, and are therefore less helpful telling us about what happens in smaller parts of the code. Programmer Tests generally need to be fast, zoom in on one small part of the system, and therefore aren't enough to give customers the confidence that we want to give them.
