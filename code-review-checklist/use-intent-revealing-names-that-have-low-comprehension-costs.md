---
title: Use intent revealing names that have low comprehension costs
description: The ratio of time spent reading versus writing is well over 10 to 1. Therefore, readibility of code is extremely important and naming things appropriately has a large impact on this.
category: Readability
publishedDate: 14/2/2020
published: true
---

# Use intent revealing names that have low comprehension costs

## Problem

> The ratio of time spent reading versus writing is well over 10 to 1. We are constantly reading old code as part of the effort to write new code. ...Therefore, making it easy to read makes it easier to write. ― Robert C. Martin, Clean Code: A Handbook of Agile Software Craftsmanship

As the above quote demonstrates, readibility of the code is extremely important and writing good variables nameshas a large impact on this. This is problematic because writing bad variable names is common and easy to do. Variable names have a large effect on the readability of code as bad names obscure the programmer’s intent and are difficult to understand. Choosing good names takes time, but saves more by making the code more maintainable and readable.

## Solutions

### Apply the single responsibilty principle

It is much easier to name and understand things when they do one thing and serve one purpose. This is why one of the major software development principles is the single responsibility principle which declares that things should only be responsible for a single piece of functionality. The concept of responsibility refers to the idea of a reason to change.

For example, the below Statistics class might be changed due to two different reasons:

- the logic of the sales statistic computation changes,
- the format of the report changes

```ts
class Statistics {
  public computeSalesStatistics() {
    // ...
  }
  public generateReport() {
    // ...
  }
}
```

This class violates the single responsibility principle and should be seperated into two classes

```ts
class Statistics {
  public computeSalesStatistics() {
    // ...
  }
}
class ReportGenerator {
  public generateReport() {
    // ...
  }
}
```

Now we have two separate classes and each of them has a single reason to change, and therefore just one responsibility. Applying to the above principle makes our code easier to explain and understand.

### Use intention revealing names

A variable’s name should express the intention (cause of uses) of the variable. If a name requires a comment, then the name does not reveal its intent and it is likely that is should be renamed, depending on the scope and context in which the variable is used.

```ts
let d; // elapsed time in days
```

The name d reveals nothing. It does not evoke a sense of elapsed time, nor of days. We should choose a name that specifies what is being measured and the unit of that measurement:

```ts
let elapsedTimeInDays;
let daysSinceCreation;
let daysSinceModification;
let fileAgeInDays;
```

Choosing names that reveal intent can make it much easier to understand and change code.

A common mistake when writing variable names is to make them describe the scenario in which they are used rather than what they mean. For example, let's say you have a ui element that you only want to show for organisation clients. A common variable name used to toggle this element would be showOrganisation or displayOrganisation. This is a bad name because it describes an implementation detail (the condition in which the variable is used) and leaves some important questions unanswered. Namely, why and when is the variable set to true or false. You would need to look up the context where the variable is set to understand this. A better name would be isOrganisation. This describes what the variables state (true or false) means and doesn't describe how the variable is used. This means that the usage of the variable isn't restricted like how showOrganisation should be if used correctly.

### Extract code into small methods

A function is a good way to group and provide a name for a certain block of code. With a good function name, you just have to read the name — you don’t need to analyze its code to understand what it does. Breaking large blocks of code into multiple smaller methods also has other advantages including greater reusability and testability.

### Extract code into different classes

A class should follow the single responsibility principle (SRP). If a class which contains methods that are significantly different from the other methods, then it indicates that SRP is being violated. To fix this the methods that are different should be moved into their own classes.

### Get your code reviewed

One of the major reasons why it is difficult to write good variable names is that it is tricky to determine when a variable name is bad. This is because when we are writing the code the context of the code is in our brains, but if someone else was to look at the code or you did in the future than that context isn't available and has to discovered again, so it is only after the fact or through getting someone else to review your code that you can realise that you are relying on contextual information that you only have access to because you were writing the code. Self reviewing shortly after writing the code, therefore, does not allow you to understand how difficult the code is to read.

## Resources

- [Code smell black sheep method](https://medium.com/thinkster-io/code-smell-black-sheep-method-9fc4a952cee6)
- [Naming variables](https://scottlee.netlify.com/posts/naming-variables)
- [single responsibilty principle](https://angular.io/guide/styleguide#single-responsibility)
- [Small functions](https://angular.io/guide/styleguide#small-functions)
- [10 tips for clean code](https://www.youtube.com/watch?v=UjhX2sVf0eg)
