---
title: Regression death spiral
description: As more features are delivered without automated testing more time must be spent on regression
tags: Software development
publishedDate: 2/4/2020
published: true
---

# [Regression death spiral](https://medium.com/slalom-build/the-regression-death-spiral-18f88b9fb030)

> Every time a story is completed, not only must it be tested, but all previously completed stories must, to some degree, be re-verified. Manual regression cannot scale with the increased delivery cadence of agile.

> This is a Regression Death Spiral – every iteration it gets harder and harder to adequately regress the existing application. The team’s productivity is suffocated as the burden of testing previous work consumes a greater and greater portion of total overall capacity. Left unchecked, the initial velocity of the team will slow and then grind to a halt, as every new change requires a substantial and growing set of previous stories to also be tested.

The regression death spiral is a concept that describes the increasing impact from not having automated tests. The regression death spiral means that:

- As more feature work is done, more time is required for regression.
- As more time is required for regression, less feature work gets developed, refined and consequently delivered,
- As less feature work gets delivered, there is more pressure on the team to deliver and, therefore, less time gets allocated to writing automated tests.
- As there is less time allocated to writing automated tests, they don't get written and regression tests need to be run manually.
- As regression tests need to be run manually, the time required for regression only ever grows.

<img class="nx-jangular-blog-centered-image" src="/assets/regression-death-spiral.png">

The regression death spiral not only impacts feature delivery it also impacts feature quality and it does so in four ways:

- it causes large and infrequent releases. Regression tests take a long time to run and they need to be run every time before a release. This means that when you don't have an automated test suite releases become infrequent and large as it is too costly to have frequent releases. This is a problem because large and infrequent releases are riskier, more time consuming and harder to manage than small and frequent releases.
- it causes the team to spend an increasing amount of time running manual regression tests. This leads to people feeling bored and like they aren't actually delivering value. A consequence of this can be apathy or experienced people in the team leaving because they are no longer satisfied with their job.
- it causes the team to be under more pressure to deliver. As regression tests take up more of the teams time, less time is spent on feature development and refinement. This leads to less features being delivered which leads to more pressure from stakeholders to deliver. This kind of pressure can have large long term impacts on the productivity of a team as it causes the team to be more likely to take shortcuts or to make sacrifices in quality that speed up short term delivery at the cost of long term productivity.
- it causes tests to be missed. Running a whole suite of manual regression tests for every release is costly and unproductive in terms of delivering value to the customer. Therefore, just like how shortcuts are taken in regards to the amount of automated tests that get written. Shortcuts will also be taken in regards to the amount of manual regression tests that actually get run. This is a major problem because it is likely to lead to code being released without being tested. Untested code is always a gamble because it has not been verified that it works or not. A second problem with untested code is that it makes developers resistant to change and more dubious about the benefits of refactoring. This change resistance overtime causes the code to stagnate and degrade in terms of quality

The solution to the regression death spiral is automation. Automation is the only way to ease the burden of regression.

<img class="nx-jangular-blog-centered-image" src="/assets/automation-fixes-regression-death-spiral.png">

Test automation allows you to continually and easily run your tests. This has many benefits that help improve velocity by enabling:

- faster feedback loops. Feedback loops allows development teams to know if their work has broken any existing changes or not. The faster the feedback loop, the faster it is for developers to fix any issues that may arise. Without test automation, developers have to wait for the QA team to complete their manual testing. Not having automated tests is a deterrent to delivering software changes quickly and reliably.
- frequent releases to production. When an automated test suite passes, it raises your confidence that the release candidate is of high quality. Since it is automated it does not require the time and resources of manual regression testing which means that it can be run frequently which allows more frequent releases.
- the team to work on what matters and delivers value. Test automation saves time and effort by freeing up the team from manual testing. This is helpful also even for QA focused roles. For example, rather than doing the same manual regression tests every time there is a new change, they can do other things such as: exploratory testing, accessibility testing, participating in refinement sessions to understand the business requirements clearly or even thinking of other ways to improve the testing automation quality even more. Test automation helps reduce the boring and repetitive tasks that teams need to do in every test cycle. Tests that are automated are also much quicker to run as these can be run in parallel which saves time and effort.
- collaboration. Since writing automated tests is basically a coding activity, test automation improves collaboration between a developer and a QA since it opens up questions on what tests should be automated and what tests are needed on what level.
