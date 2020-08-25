---
title: Branching strategies
description: A look at what branching strategies should accomplish and the consequences when this doesn't happen
tags: Software development
publishedDate: 11/8/2020
published: true
---

# Branching strategies

A branching strategy should separate the following types of code. Code that is:

- Deployed into production. This code almost always resides in a branch called master.
- Deployable. This code can reside in a master-next or a release branch.
- In development. This code can reside in a feature branch or a single integration branch called develop.

A good branching strategy process will follow the below rules:

1.  Deployable code must always be green (passing CI). This is important because this code must be able to be deployed to prod at all times. Passing CI includes avoiding soft conflicts (two pull requests that pass CI independently, but fail when merged together). One of the main strategies to do this is to merge to some test branch, run the Ci checks on that branch and only when that passes go ahead with the actual merge.
2.  The difference between deployed into production and deployable code should be small. A large difference means a large release which is going to be riskier and harder to manage than a small release. This difference is kept small by having small and frequent releases.
3.  The amount of time code is in development code should be small. That is, code should move through the whole software development process: build, test and deploy easily. It should not get blocked and cause a build up of code in development as this makes releases harder to create and causes lots of other issues.
4.  Emergency changes should be fast. In case of emergencies, fixes intended to resolve the incident must be able to merged quickly.

A good branch strategy process requires a good CI/CD process. The process for verifying code is deployable should be easy and automated. The difficulty associated with this will affect the effectiveness of any branch strategy process used. For example, proper use of trunk based development or a master-next approach requires frequent CI runs to verify the deployability of a branch when new changes are added. If these checks are costly, e.g. require manual effort, then a more appropriate strategy might be to use release branches which are created at the time of a release or to only run integration tests at the time of a release violating the first rule above. This is not ideal as it means performing tests on the integrated code very late in the development process. This can lead to many negative consequences an example of which is delayed releases.

## Common issues that occur from violating these rules

### Violating Rule 1: Having to pull out changes because the code that is meant to be deployable isn't

If the changes in an integration branch are not all deployable, then that branch cannot be deployed and all branches based off it cannot be deployed. To be able to deploy you would need to go through all the changes in the integration branch and pull them out or get them to a state where you believe they are deployable. One of the reasons to abandon the git-flow/develop branch approach is that the develop branch can easily become too large and too time consuming to see what it actually contains.

### Violating Rule 2: Large infrequent releases

The more infrequent releases are the larger they will be. This means that they are riskier, take more time to setup and are harder to manage. A common cause of large releases is the [regression death spiral](https://scottlee.netlify.app/posts/regression-death-spiral), if a team is lacking in automated tests then they will naturally end up with large and infrequent releases as the process to run manual tests required for them to release with confidence will be slow and time consuming.

### Violating Rule 3: Long running feature/integration branches

The longer a branch lives separate from the production branch, the higher the risk for merge conflicts and deployment challenges. Short lived branches promote cleaner merges and deploys.

One cause of long running branches is when code stays in development and doesn't become deployable until very late in the development life cycle. For example, you could use a develop branch and then when it comes time to deploy create a release branch and run tests to see if it is deployable. This kind of approach makes deploying changes difficult as the code in development has to be analysed before each deployment. It also causes the feedback from checking that the branch is deployable to occur very late in the development life cycle. This causes delays.
