---
title: Avoid workarounds and make sure to remove them when possible
description: Avoid workarounds and if this is not possible document them, start efforts to resolve the underlying problem and remove the workaround when the problem is resolved.
category: Readability
publishedDate: 15/2/2020
published: true
---

# Avoid workarounds and make sure to remove them when possible

A workaround is a temporary solution that can be implemented in a shorter time than a proper solution. Workarounds often allow faster short time delivery, but come with long term impacts to the codes maintainability and readability. Workarounds are ultimately about circumventing problems rather than eliminating them.

There are two primary interrelated reasons for why workarounds are made.

- pragmatism. A common reason for using workarounds is when your team uses libraries. Since libraries are not entirely under your control making changes might not be allowed or it can take longer to make changes. Libraries are often by necessity generic therefore workarounds are often required to make them match your specific use cases.
- Prioritization. Although it is better to develop quality solutions, sometimes it is necessary to workaround problems and get things to released to customers.

With long running, large and complex projects, workarounds almost always end up costing more time and effort than they save. A workaround is essentially about trading short term productivity for long term productivity. Therefore, where possible it should always be attempted to avoid workarounds. If this is not possible discuss the fact that you are going to put in a place a workaround and raise it with others. Hopefully, other people will help you find a way to avoid the workaround. If this is still not possible, document the workaround. It is a good idea, if possible, to put all workarounds in a single location so that they are easier to find. Once documented make sure that efforts are made to resolve the underlying problem that lead to the need for a workaround. If you raise a defect or issue, make sure that these are in the documentation next to the workaround, e.g. TODO comments with an issue id.

Make sure to review workarounds and remove them when they are no longer required. Workarounds are brittle solutions that if left in the code can lead to hard to debug issues or the need for further workarounds.
