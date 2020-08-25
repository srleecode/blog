---
title: Retaining velocity in enterprise Angular applications
description: A look at the practices and process that allow for velocity to be maintained while growing a large enterprise scale Angular application
tags: Software development
publishedDate: 10/1/2020
published: true
---

# Retaining velocity in enterprise scale Angular applications

Code quality through good developer practices and continual refactoring are the keys to maintaining velocity in any software development project, but as applications grow it is also essential to look at the operations that run, deploy and test the code. It is important that these operations:
 - don't continue to grow in terms of the time and resources required to run them as the application size grows. 
 - don't lead to delays in feedback or disruptions to productivity. Large applications have many people working on them, so if the test environment is brought down due to merging broken code this can have a large impact as it delays everyone working on the application.
 - don't lead to larger releases. As applications get larger, application stability becomes more and more paramount. This often leads to a more stringent change release process which unfortunately often leads to larger releases. 
 
Three examples of techniques that alleviate the above potential issues for enterprise scale Angular applications are:

- [Targeted build, lint, test and E2E test operations](https://scottlee.netlify.com/concepts/using-affected-to-run-targetted-CI-and-CD-operations)
- [Deploy Urls to get earlier feedback](https://scottlee.netlify.com/concepts/deploy-urls)
- [Small frequent releases](https://scottlee.netlify.com/concepts/small-frequent-releases)

