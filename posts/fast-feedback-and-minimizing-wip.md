---
title: Fast feedback and minimizing WIP
description: A discussion on the costs programmers can control and why fast feedback and minimizing WIP are the best tools to reduce them
tags: Software development
publishedDate: 5/6/2020
published: true
---

# Fast feedback and minimizing WIP

Bugs, shortcuts and overcomplicated or unnecessary solutions can be thought of as waste. Bugs that occur in production introduce a lot of work that is difficult and annoying. The bugs are hard to track down and reproduce. While working on them, tickets need to be raised and stakeholders informed. Overall, it is a laborious process. Therefore, it is easier and much more preferable to fix bugs earlier in the development life cycle. Similarly, if shortcuts are taken, code bases become harder to read, maintain and overtime become a real pain to work with. If solutions are overcomplicated, then it means that extra work is being done with no benefit. Developers can care about fixing these things for a lot of different reasons, but primarily they should care about them for selfish reasons. They should be [lazy](http://threevirtues.com/) in regards to this work because it is unnecessary, unhelpful and boring work that as a good developer they can reduce.

Developers minimize this waste by:

- not taking shortcuts. That is, building things with quality. The goal is to be lazy, but in a long time frame. Laziness has a negative connotation because it is normally done in a short time frame. People are greedy with their laziness. They take shortcuts that allow them to delay costs, but those delays increase the overall costs substantially. For example, it is well known that code is read many more times than it is written. Now, it takes time to think about your code and refactor it so that it has high quality, but if this is not done that over the long term a lot more effort is spent trying to understand and maintain the low quality code that has been written. Developers should write high quality code because they are lazy and don't like reading and maintaining low quality code.
- generating appropriate and useful feedback quickly so that among other things bugs cam be discovered earlier¹. Problems in software are almost invisible. It is very difficult to look at code and to find problems. It is for this reason that most error detection in software is feedback based. Errors are discovered by running the program or portions of it and looking at the output. If the output does not match the expected results, then there is likely a bug causing that deviance. Generating this feedback is called testing.
- Minimizing work in progress (WIP)². Everyone is limited. They can only focus on a set amount of things for a set amount of time. When they move past these limits, focus is lost and quality begins to drop. Quality requires focus and high WIP eliminates the ability to focus. It is particularly debilitating to developers as it introduces a significant context-switching overhead. When someone is coding, they are holding a lot of pertinent information about the problem they are solving in their minds. When they are interrupted, those details are lost, we call this "losing focus". It can take roughly 10 to 20 minutes to regain focus or to get back into the zone, depending on the task. High WIP means that you need to constantly be juggling multiple items at once. This causes focus to be lost and time to be lost as as you need to remember where you left off with each task in the rotation. The overall idea is that if you try to do too many things, the results will be lower in quality.

WIP applies to the whole process from design to release. It is also not only applicable at the story level it is applicable all the way down to the granular level of the design of the code being written. Design not only applies to the UI. It applies to all interfaces. Classes, objects, apis they all start with a design, an idea of what the solution should be.

A developer, can minimize their WIP in regards to:

- the design of their code. This is done by taking small steps. One way to implement this is TDD which involves keeping the design in your head small and letting it emerge from the small steps taken to complete the red, green, refactor cycles. The greater idea is to take a small step, look at the feedback, integrate it and use it to help you decide on the next small step. Don't think ten steps ahead because this causes large complicated designs. Large and complicated designs are hard to focus on which causes important things to be missed and fixation on things that in the overall picture aren't that important.
- the reviewal of their code. Keep pull requests small. This is the number one way to speed up the review time on pull requests. This is because if they are small it is easier for the reviewer to understand the context of the PR. It is easy to make big pull requests and takes more effort to make small logical ones, but the effort is well worth it because it leads to pull requests that are quick to review and easier to review properly.
- the releasing of their code. One of the major constraints in software development teams is the releasing of code. Code should be released frequently, but what often happens is that releases are infrequent and very large.

One of the major constraints when trying to minimize WIP is the ability to quickly generate useful feedback. For example, you can't release frequently if every time you release you need to run a whole suite of long running tests. It is just not practical. If you are going to work in small batches, you need fast feedback. The costs from working in small batches, cannot overwhelm the benefits. The best way to ensure feedback is fast is to minimize the code under test. This has two dimensions: tests should not touch³ more code than they need to and tests should not be run when they don't need to.

---

¹

Costs increase as code progresses because:

- the developer loses the contextual information gained while writing the code.
- the problems become harder to discover as you need to reproduce the context causing the issue. A failing unit test let's you know the context straight away
- there is greater impact issues in dev and test aren't going to impact the actual customers.

<img class="nx-jangular-blog-centered-image" src="/assets/cost-to-fix-bugs-based-on-time-of-detection.jpg">

²

Minimizing WIP can also be useful as it can highlight constraints (areas in the process that operate slower than the rest which if unchecked cause higher WIP).

The violation of a WIP limit is a signal that there is a short term bottleneck that the team can 'swarm' to resolve. Constraints are when the same bottlenecks occur consistently. Constrains are a form of “waste” that need to addressed through process improvements and/or resource adjustments.

³

Test that touch too much code happen when you have:

- too many tests at a high level which leads to more slow, brittle and flaky tests.
- tests at too low a level. If you test implementation details, then your tests or going to break for reasons that are unrelated to defects in your code. A tests job is to protect you from change. It verifies that certain conditions are met. If you are trying to verify that something that can change doesn't, then that is a waste.
