---
title: Feature flags
description: Feature flags are used to hide, enable or disable a feature during runtime
tags: Software development
publishedDate: 28/3/2020
published: true
---

# Feature flags

Feature flags (also known as feature toggles or feature switches) are a software development technique that turns certain functionality on and off during runtime, without deploying new code. This allows for better control and more experimentation over the full lifecycle of features. The idea behind feature flags is to build conditional feature branches into code in order to make logic available only to certain groups of users at a time. If the flag is “on,” new code is executed, if the flag is “off,” the code is skipped.

Feature flags are one of the main tools that are used to enable small and frequent releases. This is because feature flags are a fundamental part of trunk based development.

See [Feature flag code smells](https://scottlee.netlify.com/posts/feature-flag-code-smells) for how best to use feature flags.
