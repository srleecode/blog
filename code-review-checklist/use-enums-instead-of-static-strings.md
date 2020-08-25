---
title: Use enums instead of static strings
description: Use enums instead of static strings that are used in multiple places
category: Refactoring
publishedDate: 14/2/2020
published: true
---

# Use enums instead of static strings

## Problem

If static strings are used in multiple places, it means that there are multiple places for potential typos since static strings are not typed and updating the static string can be difficult due to it being used in multiple places.

## Solution

Use an enum value instead of the static string
