---
title: Feature flag code smells
description: A look into good practices to follow when using feature flags and what to avoid
tags: Software development
publishedDate: 28/2/2020
published: true
---

# Feature flag code smells

Two major things make releasing difficult:

- Larger releases. Large releases require a large amount of testing and mean that there is a large amount of time between releases. This makes testing more difficult because the context of the change has often been lost due to it being developed a long time ago.
- Code that has been isolated. Feature branches isolate code in separate branches. Merging these branches can be complex and the time taken to stabilize a release branch can be unpredictable causing delays in release times.

As projects get larger, the need for and benefits from release velocity and working as close to trunk as possible become greater. Feature flagging is a strategy that enables this and it does this primarily by decoupling deployments from releases.

Feature flags are useful tools, but they are still tools that need to be managed. Poorly managed feature flags not only make the development and testing of the code more complex they can also lead to the exposure of unfinished code. This has in the past lead to a [high-profile business failure](https://dougseven.com/2014/04/17/knightmare-a-devops-cautionary-tale/) at a major financial institution. The team used feature flags to contain operational risk when they introduced a new application feature. Unfortunately, they re-purposed a flag which was used by old code (code left in the system even though it hadn't been used in years).

Feature flagging changes how code is released, but it should also change how the code is developed. It requires a a particular development mentality because it requires features to be easy to revert (disable). Developing new features behind a feature flag requires discipline and additional effort during feature design and development. The investment in making features independent and toggleable has the positive side effect of making the system more decoupled from other features. This side effect is comparable to the side effect of writing unit tests – unit tests force the system to be written in a modular manner because each unit must be tested independently. This investment remains after the feature flags have been physically removed from the system and leads to lower coupling, which should improve long-term maintenance and testing of a system.

Feature flag code should be be treated the same as actual code in terms of quality checks and testing. Code that is behind a feature flag goes through the same testing and review process as any other change made to trunk. That said, whereas branches enable experimentation with temporarily broken code, feature flags are less forgiving, since code guarded by a flag at least needs to be compilable. Just as there are code smells there are smells in regards to how feature flags are used. Some examples are:

## Dead flags - not removing flags when they are no longer needed

Like other sources of technical debt, feature flags are cheap and easy to add in the short term. But the longer that they are left in the code, the more that they will end up costing you.

Release flags are supposed to make it easier and safer to push code out. You can push code out only to a limited number of users to start, reducing the impact of problems, or dark launch features incrementally, carefully assessing added performance costs as you turn on some of the logic behind the scenes or run functions in parallel. And you can roll-back quickly by turning off features or optional behaviour if something goes wrong or if the system comes under too much load. But as you add more feature flags it can get harder to support and debug the system. Also, keeping track of which flags are in which state in production and test can make it harder to understand and duplicate problems.

Different types of feature flags can exist for different period of time in the code. Permission flags and ops flags are long-lived flags based on their usage purpose in the code. Release flags and experiment flags are short-lived flags. The implementation and management of each type of the four flag types are different. The developer should know the type of the flag before designing and implementing the flag. The developer can manage the quality of flag’s implementation and plan to remove the flag on time based on the type of the flag. In addition, the first step to control the number of feature flags in the code is to identify short-lived flags which should be removed faster than others.

Defining the process for the clean-up practices for feature flags helps teams to remove their feature
flags on time and manage the complexity of using feature flags.

The five following practices are example practices implemented by companies today:

- Add expiration date: Using this practice helps practitioners to remember when to remove a flag, using one of the following three processes:

  – Time bombs: If the flag exists after its expiration date, a test fails or the application does not start, which causes a developer to remove the flag. The expiration date is the latest possible date which the developers should remove the flag from the code.

  – Automatic reminders: Add automatic reminders to remind developers the deadline for removing feature flags. For example, Slack has an archival system. When developers want to add a new feature flag, they have to specify the date they plan to delete the flag. If the flag is not deleted by the specified date, the developer will get an alert.

  – Use cards/tasks/stories for removing flags: Add tasks/stories/cards for removing flags to a Kanban board (or any other tool that the team uses) or to developers task backlog. For example, developers at Lyris create user stories for removing flags.

- Track unused flags: With this practice, dead code and unused feature flags are removed. When a flag is always on or always off, it should be removed. Based on the logging system or maintenance tool, the status of flags could be monitored. Developers can use this data to find when the flag is safe to remove.

- Limit the number of feature flags: Using this practice the number of alive feature flags at a time are limited to control the number of flags. An alive feature flag is a flag which exists in the code whether it is on or off. By this limitation, practitioners have to remove an unused flag to be able to add a new flag if the number of existing flags meets the limitation. If short-lived flags are identified using the “Determine the type of the flag” practice, developers have a candidate list of flags to be removed.

- Create a cleanup branch: This is the practice of creating a branch to delete the flag and submitting a pull request for the branch at the same time as adding a new feature flag to prevent forgetting the deletion of the flags.

- Change a feature flag to a configuration setting: This is the practice of keeping feature flags in the code with changed functionality. The feature flag can be changed to admin or user configuration settings. Using this practice prevents creation of dead code. As an example, suppose a feature flag is used for running experiments to see which color is better for the “buy” button in an e-commerce application. The experimental results show that the users are happiest when they can control the color of the button. Instead of deleting the feature flag, it will be changed to a user configuration setting.

## Using a feature flag when it is not required

Before the design and implementation of a feature flag, the development team should determine if a feature flag should be used in the existing situation or not. Using feature flags adds more decision points to the code which adds more complexity to the code and requires attention to remove flags when the initial use is completed. There are also dangers in releasing code that is not completely implemented, especially if you are following branching by abstraction and checking in work-in-progress code protected by a feature flag. If the scaffolding code isn't implemented correctly you could accidentally expose some of this code at run-time with unpredictable results.

> …visible or not, you are still deploying code into production that you know for a fact to be buggy, untested, incomplete and quite possibly incompatible with your live data. Your if statements and configuration settings are themselves code which is subject to bugs – and furthermore can only be tested in production. They are also a lot of effort to maintain, making it all too easy to fat-finger something. Accidental exposure is a massive risk that could all too easily result in security vulnerabilities, data corruption or loss of trade secrets. Your features may not be as isolated from each other as you thought you were, and you may end up deploying bugs to your production environment” - [James McKay](http://web.archive.org/web/20110721063430/http://jamesmckay.net/2011/07/why-does-martin-fowler-not-understand-feature-branches/)

> Release toggles are a useful technique and lots of teams use them. However they should be your last choice when you're dealing with putting features into production. Your first choice should be to break the feature down so you can safely introduce parts of the feature into the product. The advantages of doing this are the same ones as any strategy based on small, frequent releases. You reduce the risk of things going wrong and you get valuable feedback on how users actually use the feature that will improve the enhancements you make later. - [Martin Fowler](https://martinfowler.com/bliki/FeatureToggle.html)

## Poor quality feature flag names

Setting up a naming convention that aims to make the intention of feature flags self documented has many benefits:

- understanding the purpose of using the flag is useful, i.e. if the owner of the code is changed, the new owner can understand the usage of the flag easily if the name of the flag reflects its usage.
- it is less likely to have multiple flags with same names in the code even by different teams by following naming conventions
- adding the type of the flag as a prefix in its name can help with the management of the flags. For instance, if the feature flag is a short-lived flag, like release flags, the developer will get a signal from the name of the flag that the first intention of using the flag was a short-term use and will plan to remove it. In InVision, long-lived flags have “OPERATIONS-” prefix. Developers in this company also add the JIRA ticket number to the name of the feature flag to make the purpose of using the flag and responsible team to remove the flag clear.

## Confusing/complex uses of feature flags

When feature flags are used incorrectly, their implementation could cross-cut a large number of components, all of which would be scattered with feature flags. Developers should not go and sprinkle code flags everywhere. To avoid this the toggle for the most part should be at the edge, e.g. guards or Using directives to hide/show components or [lazy loaded components](https://brianflove.com/2019/12/13/lazy-load-angular-v9-components/) and loading the correct one based on the flag value. Some amount of flags will be needed at the core level, e.g. using one or another api and would be configured using if conditions.

### Spaghetti (Combinatorial) flags

We can observe this flag smell when the execution of code is controlled by combination of states of several flags. The following consequences we can observe with presence of this flag smell in the project:

- cost of testing will increase for the code areas covered under such flags
- changing existing code base will become non-trivial
- code complexity becomes higher and understanding code becomes difficult

### Spread flags

We can observe this flag smell when the same flag is used across several modules or packages as well as across several source files. This flag smell may appear if features are not isolated. In case an agile methodology is followed using user stories, the user stories are not decomposed to the possible extent. Another reason can be, if a feature becomes a cross cutting concern in the source code or modules. This also indicates that the component architecture of the target system is highly coupled and not easily decomposable. However, this smell is not because of the usage of the flag methodology. Another possible cause that could lead to this smell is use of master flag to control the set of relevant features. So in this scenario this smell may become a false positive from the project’s perspective. A master flag is when one or more feature flags is dependent on it. For example if the main menu item is not enabled or visible, then the sub menus should not be visible or enabled. So in this scenario the flag that turns the sub menus on, must be dependent to the flag that controls the main menu. In this case we may call the flag for main menu as “Master flag”. Often, a master flag is used to turn on/off many slave flags of the related/dependent features. In some software segment like e-commerce/online gambling/gaming, a set of features will be targeted for audience of a particular region, in these cases a master flag is used to control the dark-launch for all or some of the features.

## Duplicated toggling logic

The logic to toggle flags is brittle and can naively be duplicated throughout the code. To ensure it can be easily tested and tested once it is a good idea to create a wrapper service which would then expose functions that give the feature flag result. This abstracts the toggling logic and allows it to be tested in once place.

## Not using a feature flag management systems

Management systems help companies to create use and change the value of feature flags in a centralized system. Adding feature flags adds to the complexity of the code and managing a number of feature flags could be challenging. Using feature flag management systems help to overcome the technical debt and manage the added complexity. The management systems are connected to the code and the changes impact the running system immediately. Feature flag management systems can have a dashboard that helps team members to see the list of feature flags and their current values. Team members can add new feature flags or change the values of the flags if they have the permission.

Useful links:

- https://spectrum.library.concordia.ca/983513/1/Rahman_PhD_S2018.pdf
- https://arxiv.org/pdf/1907.06157
- https://research.fb.com/wp-content/uploads/2017/01/paper_icse-savor-2016.pdf
- https://www.atlassian.com/dam/jcr:4eaee3a8-1e5e-4741-9466-32d53f0a8ac9/Rising.The_.Flag_.Rollout-1.pdf
- https://rollout.io/wp-content/uploads/2018/05/The-Ultimate-Feature-Flag-Guide.pdf

Types of toggles

<img class="nx-jangular-blog-centered-image" src="/assets/short-lived-toggles.png">
<img class="nx-jangular-blog-centered-image" src="/assets/long-lived-toggles.png">
