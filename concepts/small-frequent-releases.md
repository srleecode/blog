---
title: Small frequent releases
description: Small and frequent releases are a better way to release code because you reduce the risk of things going wrong, make releasing code easier and you get valuable feedback on how users actually use the features
tags: Software development
publishedDate: 28/3/2020
published: true
---

# Small frequent releases

Large projects often end up with large releases¹ that happen infrequently. This is directly opposite to the optimal approach which is to have small releases that happen frequently. In Kanban there is the idea of minimising work in progress (WIP), small releases is about the same idea, but it is also saying that WIP should be limited across the whole process from development all the way to deployment into production.

Being forced to release more frequently than is required by feature deployment requirements has many beneficial side-effects that make release velocity a goal unto itself. As release velocity is ratcheted up, negative behaviours such as too much manual testing or too much internal coupling become more painful and many optimal behaviors are incentivised such as automated regression, UI and performance tests which makes the team more agile and able to catch defects sooner and more cheaply.

When incremental feature changes can be released to beta channels more frequently, user interaction designers and product managers get much faster feedback about what paths lead to better user engagement and experience than in big, slow releases where an entire feature is deployed simultaneously. This results in a better product.

Large releases are also bad because they lead to lost time from the management of the large amounts of code that pile up in them. There is also a greater tendency for scope creep to happen since the code that hasn't been released yet tends to be seen as more changeable. Large releases also lead to the code being tested and further developed when the context of it has been lost due to it being developed a long time ago. This makes it harder to verify that the code works and to design it well.

<img class="nx-jangular-blog-centered-image" src="/assets/large-vs-small-releases.png">

The ideal approach to achieving small releases is to break features down so that you can safely introduce parts of the feature into the product. Small, frequent releases are better because you reduce the risk of things going wrong and you get valuable feedback on how users actually use the feature that will improve the enhancements you make later.

Breaking a feature up isn't always possible so to achieve small releases there is often a need for some mechanism to handle pending features that are going to take longer than a single-release cycle. There are two ways to achieve this: feature flags and feature branches. Both have their downsides with feature flagging being the best approach for most situations. Feature branches are problematic because they lead to intense merge complexity. Feature flags avoid the complex and intense merges, but they add some extra complexity to the code itself, which carries a maintenance weight.

---

¹ Some causes of large releases are:

- A slow code-review process - when code review is laborious and takes hours or days, developers avoid working in small batches and instead batch up many changes. This in turn leads to a downward spiral where reviewers procrastinate with large code reviews due to their complexity. Consequently, merge requests often languish because developers avoid them. Large changes are riskier because it is hard to reason about the impact of large changes on a system through inspection, i.e. defects are likely to escape the attention of reviewers.
- An overly restricted or manual release process – when it is difficult to release new changes, developers are naturally going to end up bundling their changes together and creating large releases.
- Segregation of changes using branches - feature branches conflict with the core principle of continuous integration which is that of integrating code frequently. If you are doing development on long-lived feature branches then you are no longer integrating code with everybody else’s frequently enough. This means delayed feedback, big bang merges that can be risky and time consuming to resolve, reduced visibility and reduced confidence.
- Manual testing has many downsides and since it is slow process it leads to less and hence larger releases.
  - Manual regression testing is time-consuming to execute and expensive to perform, which makes it a bottleneck in the process. Software can't be released frequently and developers can't get quick feedback.
  - Manual tests and inspections are not reliable, because people are poor at repetitive tasks like manual regression tests and it is hard to predict the impact of changes on a complex software system through inspection.
  - For systems that evolve over time, keeping test documentation up to date requires a considerable effort.
