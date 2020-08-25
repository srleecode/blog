---
title: What makes a good front-end test suite?
description: A look at what makes tests valuable and costly as well as some recommendations on how to maximise that value while reducing the costs
tags: Software development
publishedDate: 23/1/2020
published: true
---

# What makes a good front-end test suite?

The quality of a test suite should be determined by the return on investment (ROI) of the test suite. The ROI is all about how the costs associated with creating, maintaining and running the tests compare to the benefits that the feedback from the tests provide.

Using a ROI based determinant for the quality of a test suite highlights an important aspect of tests: they start out as costly and are only valuable when their costs are offset by the usefulness of their feedback. This means that more tests aren't necessarily a good thing and that we should try to maximise the value of tests by writing high quality tests as well as eliminate tests that don't provide valuable feedback.

A good test suite provides both case coverage and useful error descriptions.

Case coverage is a measure of how well a test verifies certain use cases enabled by an interface. Note that code coverage (how much of the codebase is being covered by each test) is only a useful metric because it helps uncover portions of the code that have potentially been missed in testing. Having good code coverage, however, does not mean that the tests are valuable. Case coverage is what determines this. Case coverage gives you the confidence that if the tests pass, the code is pretty much good enough to ship.

Error descriptions or their usefulness are an important part of a good test suite. A good test suite not only tells you that there is a problem. It also narrows the problem down to a specific component or code path. Even though the objective of a test is to identify a systemic issue, the larger goal of having a test is to help identify the broken code and to get it fixed quickly. If a test failure is very generic it becomes very difficult to debug and find the root cause. Therefore, test failure points should be focused, specific and should contain enough information to debug the issue. Providing useful errors is one of the reasons why a large portion of your tests should be at one of the lower layers¹. Some amount of high level tests are required².

---

¹

Applications are made up of layered interfaces

A REST API, a command line interface and a user interface in a web application are all different types of interfaces. They are similar in the fact that their value lies in what they allow their users, or consumers of the interface, to be able to do. That is, their value comes from the use cases they enable.

The value of a test is that it verifies that a use case enabled by an interface works as expected. Tests work by simulating the use case and checking for certain behaviors.

An interface is often made up of layers of different interfaces. For example, a user interface is made up of components which have their own interfaces which internally call services that have their own interfaces etc.
Testing all the various use cases that an interface allows can be costly. There are two methods for reducing these costs. The first is replacing dependencies used by the interface with something that is easier to instantiate, e.g. mocks. The second is by testing a lower layer interface. For example, if testing a rest API this could mean testing a specific class. The benefit of this is that it reduces the code under test. Both of these methods to reduce costs leave gaps in the test suite which is why unit tests should be complemented by some amount of integration and E2E tests. These tests verify that all the isolated components work together.

²

On any project with sufficient complexity, some amount of higher layer tests are required. This is because you are likely to never be able to do a good enough job at the lower layers. You will repeatedly build fakes that differ from the real component, in ways that turn out to be subtle but crucial. You will repeatedly fail to anticipate the disastrous emergent behavior that can result from seemingly innocuous changes.

Some easy to understand examples of why some tests at the higher layers are needed:

- https://twitter.com/thepracticaldev/status/687672086152753152
- https://twitter.com/timbray/status/822470746773409794
- https://www.youtube.com/watch?v=mC3KO47tuG0
- https://mobile.twitter.com/withzombies/status/829716565834752000

Having [too many tests](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html) at the higher layers, however, quickly becomes [problematic](http://blog.thecodewhisperer.com/permalink/integrated-tests-are-a-scam) because they are slow, unreliable and depend on too many things at once.
