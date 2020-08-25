---
title: Naming variables
description: In depth look into what makes good variable names
tags: Software development
publishedDate: 7/2/2020
published: true
---

# Naming variables

In this post I want to cover:

- The reasons why looking into what makes a good variable name is important
- What makes a good variable name
- The costs associated with understanding a variable name

## The reasons why looking into what makes a good variable name is important

> The ratio of time spent reading versus writing is well over 10 to 1. We are constantly reading old code as part of the effort to write new code. ...Therefore, making it easy to read makes it easier to write. ― Robert C. Martin, [Clean Code: A Handbook of Agile Software Craftsmanship](https://www.goodreads.com/work/quotes/3779106)

As the above quote demonstrates, writing good variables names is very important which is problematic because writing bad variable names is common and easy to do. Variable names have a large effect on the readability of code as bad names obscure the programmer’s intent and are difficult to understand. Choosing good names takes time, but saves more by making the code more maintainable and readable.

## What makes a good variable name

There are two factors that determine the quality of a variable name:

- Expressiveness - this is a measure of how well a name tells you what it does, why it exists, and how it is used. The readability of code largely comes down to our ability to write code that expresses our intent and an understanding of that intent that can be transferred to anyone else who reads the code. As Ward Cunningham put it: "You know you are working on clean code when each routine turns out to be pretty much what you expected." A bad name is one that is ambiguous, doesn't provide useful information or is unable to be understood.
- Comprehension costs - this is a measure of how difficult it is to understand what a variable name means. Understanding low quality code takes time, is difficult to do correctly and is mentally exhausting.

As the below diagram demonstrates the best variable names are both expressive and have low comprehension costs.

<img class="nx-jangular-blog-centered-image" src="/assets/expressiveness-vs-comprehension-costs.png">

Examples:

- Vague - data. This is bad because it could be anything.
- Obscure - GetAccBalance could mean accruedBalance, accreditedBalance, accountBalance etc.
- Verbose - totalOfAllInvoicesIncludingPaidAndUnpaid. totalInvoices would be better because it is shorter and still provides the same informational content.

## The costs associated with understanding a variable name

The goal of a variable name is to convey information about intent and meaning. This goal isn't reached for free. To understand what a variable means it takes both time and effort. That is, it involves some costs. These costs are: parsing cost, context exploration cost and working memory cost.

These costs are likely to be different for different people which explains why people have differences in opinion over the best way to name things. For example, if the parsing cost was bigger for someone compared to the context exploration cost then they would prefer more concise names more often.

### Parsing cost

Simpler and shorter code has a smaller parsing cost. For example: in `GetAccountBalanceForUser(user: User)` we rely on implicit context to determine who the account balance is for. The below conveys the same meaning, but is more concise and hence has a lower parsing cost. `GetAccountBalance(user: User)`

To optimise for parsing cost we should try to be concise, but still retain as much expressiveness as possible. [Russ](https://research.swtch.com/names) Cox expresses this succinctly:

> A name's length should not exceed its information content.

One way in which variable names are often longer than they need to be is when they describe implementation details. A function name should only describe the what, not the how.

### Context exploration cost

Context exploration cost is the cost involved with having to explore the code to understand the relevant context. Concision leads to ambiguity and a greater need to explore the surrounding context in order to understand the correct meaning. For example, GetAccBalance could mean accruedBalance, accreditedBalance, accountBalance etc.

Context is a vital part of understanding what a variable means because it is what allows us to resolve ambiguity, i.e. choose the correct interpretation out of all the potential ones.

One of the major reasons why it is difficult to write good variable names is that it is tricky to determine when a variable name is bad. This is because when we are writing the code the context of the code is in our brains, but if someone else was to look at the code or you did in the future than that context isn't available and has to discovered again, so it is only after the fact or through getting someone else to review your code that you can realise that you are relying on contextual information that you only have access to because you were writing the code. Self reviewing shortly after writing the code, therefore, does not allow you to understand how difficult the code is to read.

### Working memory cost

Remembering what a single letter or abbreviated variable actually means places a burden on our working memory as we need to remember the context and internally convert the variable name. There is also a working memory costs based on remembering the state of variable as it is used throughout a function.

Working memory cost can be reduced by writing smaller functions that only do one thing and using intention revealing names that are less reliant on the context of the code in order for people to correctly derive their meaning.

### Practical rules

When it comes to variable naming, clarity is the primary concern. However, well used concision can make the code more readable. Concision, however, by necessity makes you more reliable on context in order to derive the appropriate meaning. Therefore, the higher the code exploration cost and working memory cost becomes the less beneficial concision becomes. Some corollaries from this are:

- The smaller scope a variable has the less costs abbreviation and concision has
- Commonly used and readily understood abbreviations have less cost than new abbreviations. getAscOrders is better than getBlc which is meant to be get balance. A variable name used only a few times is not familiar nor will it become familiar. However, a variable name, or a function name, that is used throughout a program might be a good candidate for abbreviation.
