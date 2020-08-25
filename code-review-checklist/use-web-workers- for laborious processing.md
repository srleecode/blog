---
title: Use web workers for laborious processing
description: Use web workers so that laborious processing can be performed in a separate thread, allowing the UI thread to run without being blocked or slowed down.
category: Performance
publishedDate: 14/2/2020
published: true
---

# Use web workers for laborious processing

## Problem

Processing intensive operations can block or slow down the UI.

## Solution

Sometimes we cannot refactor functions/method so that they will run in an acceptable amount of times or use an acceptable amount of resources. To avoid having an impact on the users experience web workers can be used. A web worker is a thread created to run heavy computations. The web workers run the code and emit the result to the browser. So the offloading of the heavy work to web workers leave the browser and the UI experience smooth.
