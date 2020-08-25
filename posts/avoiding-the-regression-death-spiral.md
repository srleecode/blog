---
title: Avoiding the regression death spiral
description: Write tests with a high return on investment so that you are less pressured to fall into the regression death spiral
tags: Software development
publishedDate: 9/4/2020
published: true
---

# Avoiding the regression death spiral

Improving automation takes time and it impacts short term delivery. This makes delaying automation efforts an alluring concept and the regression death spiral a common occurrence. As seen in the below diagram, when we focus on code quality, which can include automation efforts, we do so at the expense of short term delivery. There is a cost to focusing on quality. That cost is quickly eclipsed by the benefits from it, but there is a cost and it is a very influential one. This is because it is a cost that is very visible and must be paid upfront.

<img class="nx-jangular-blog-centered-image" src="/assets/velocity-and-code-quality.png">

The best way to avoid the regression death spiral is to maximise the return on investment (ROI) from the tests that do get written. The greater the cost to write and maintain automated tests the more alluring it will be to delay the to write them. Therefore, It stands to reason that if anybody is interested in avoiding or getting out of the regression death spiral they should prioritise and ensure that they are writing tests that have high levels of value and low levels of cost.

Tests with high ROI are written by doing three things:

- Recognising that what we call automated tests are actually automated checks
- Utilising the feedback from tests
- Writing high quality tests

## Recognising that what we call automated tests are actually automated checks

Not everything that is called testing can be automated only the portion of it that is actually [checking](https://www.satisfice.com/blog/archives/856) can be automated. The definition of a check is an evaluation that is made based on an algorithm. What we call automated tests are things that require specific and explicit expectations to check against. To write an automated tests you need to have figured out what the test is expecting and you need to be able to define that explicitly. This takes time often a lot more than a manual test would. While some tests can be automated (made into checks), not all of them can. Exploratory testing, for example, requires learning, when you perform a test, what you learn from it is going to influence your next test. Learning in this way can not yet be automated.

Automating testing isn't necessarily about stopping manual tests. It is about stopping the rerunning of manual tests. Automated tests are ultimately programmed checks of things that have already been tested. Therefore, writing an automated test requires the same knowledge and domain expertise you would need to run a manual test. You need to know how to create the test data and how to define the test scenarios in such a way that they can be automated and will be valuable. Developers think differently to people whose main role is BA or testing. To write high ROI automated tests developers need support from BAs and testers.

## Utilising the feedback from tests

A test that is never run gives you no value. Similarly, test reports that are never read or monitoring output that is never looked at give you no value. Testing only provides feedback. The value that is derived from that feedback depends upon how it is used.

It is important to note that running a test is a cost. It takes time. Therefore, tests should only be run when the value of their feedback is expected to be greater than the cost of running the test. We can do this by:

- creating shorter feedback loops by getting feedback as early in the process as possible, e.g. by using [deploy urls](https://scottlee.netlify.com/concepts/deploy-urls)
- making feedback more complete, for example, by testing different scenarios and using the right testing tool, e.g. unit test, UI test, visual regression test or E2E test, for the scenario being tested.
- making feedback targeted so that we can have faster feedback loops that can happen more often. Targeted test runs minimize the number of tests run and the code under test when a test does run. Some ways in which to do this are:
  - Writing tests well so that they don't use more code than they need, e.g. https://scottlee.netlify.com/concepts/isolated-tests-dont-need-testbed
  - reducing the tests run and code compiled to only the parts that are relevant to the code that has changed - see [targeted build, lint, test and E2E test operations](https://scottlee.netlify.com/concepts/using-affected-to-run-targetted-CI-and-CD-operations)
  - Setting up the whole CI pipe line so that appropriate tests get run at each appropriate stage of code delivery.
  - Reducing tests when they are no longer needed or provide no value

## Writing high quality tests

A large factor of what impacts the value of a tests feedback is the quality of the test itself. Higher quality tests are more likely to provide feedback that is unique, reliable and quick. They are also easier to read and maintain which are important factors in reducing the costs to maintain and update tests.
