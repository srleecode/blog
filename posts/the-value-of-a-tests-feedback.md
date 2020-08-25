---
title: The value of a tests feedback
description: A description of the factors that affect the value of a tests feedback
tags: Software development
publishedDate: 8/4/2020
published: true
---

# The value of a tests feedback

Different types of tests deliver different types of value¹. In general, unit tests are good for fast developer feedback, i.e. error descriptions, integration tests are good for covering all the corner cases of component integrations and functional (E2E) tests are good for making sure everything works right for the end users².

The value of a tests feedback:

- changes based on how much the code under test has changed. This is because changes to the code are where bugs and defects are introduced.
- is asymmetric in relation to time as feedback that is received earlier is much more valuable than the same feedback that is received later.
- changes based on how much people trust the tests. A broken test should indicate that the requirements have changed or that an implementation is wrong. If tests break outside of these situations, then their feedback is not valuable and is, in fact, extremely costly. When tests become brittle, for example, renaming a button breaks swarms of tests developers start not running the tests and start fearing refactoring.
- changes based on the existence of other tests. Two tests that both check the same thing are more costly and no more valuable than one. It is, therefore, a mistake to repeat all your unit tests all over again at the higher more expensive brittle layers, for example through E2E tests³.

To summarise, the value of a tests feedback is directly proportional to how unique, quick and reliable it is. Also, the more the code under test changes the more valuable running the test will be.

---

¹

When writing tests there is not only feedback from the test result, but also from your internal feelings of how difficult it is to write the tests. These feeling are indicators of the design quality. Difficulty in implementing tells you something about the code quality. If you take that difficulty into account then it forces you to write better code otherwise it gets harder and harder to test. If you don’t write tests first, you don’t really get to apply these benefits

Tests can also be valuable in terms of documentation.

²

Applications are made up of layered interfaces

A REST API, a command line interface and a user interface in a web application are all different types of interfaces. They are similar in the fact that their value lies in what they allow their users, or consumers of the interface, to be able to do. That is, their value comes from the use cases they enable.

The value of a test is that it verifies that a use case enabled by an interface works as expected. Tests work by simulating the use case and checking for certain behaviors.

An interface is often made up of layers of different interfaces. For example, a user interface is made up of components which have their own interfaces which internally call services that have their own interfaces etc.
Testing all the various use cases that an interface allows can be costly. There are two methods for reducing these costs. The first is replacing dependencies used by the interface with something that is easier to instantiate, e.g. mocks. The second is by testing a lower layer interface. For example, if testing a rest API this could mean testing a specific class. The benefit of this is that it reduces the code under test. Both of these methods to reduce costs leave gaps in the test suite which is why unit tests should be complemented by some amount of integration and E2E tests. These tests verify that all the isolated components work together.

³

On any project with sufficient complexity, some amount of higher layer tests are required. This is because you are likely to never be able to do a good enough job at the lower layers. You will repeatedly build fakes that differ from the real component, in ways that turn out to be subtle but crucial. You will repeatedly fail to anticipate the disastrous emergent behavior that can result from seemingly innocuous changes.

Some easy to understand examples of why some tests at the higher layers are needed:

- https://twitter.com/thepracticaldev/status/687672086152753152
- https://twitter.com/timbray/status/822470746773409794
- https://www.youtube.com/watch?v=mC3KO47tuG0
- https://mobile.twitter.com/withzombies/status/829716565834752000

Having [too many tests](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html) at the higher layers, however, quickly becomes [problematic](http://blog.thecodewhisperer.com/permalink/integrated-tests-are-a-scam) because they are slow, unreliable and depend on too many things at once.
