---
title: Microfrontends an expensive solution
description: Microfrontends is an expensive solution that might make sense if your organisation is facing some certain types of expensive problems which are described in this post
tags: Software development
publishedDate: 16/1/2021
published: false
---

# Microfrontends an expensive solution

If you’re looking to a thorough introduction to microfrontends, see [this article](https://martinfowler.com/articles/micro-frontends.html) by Cam Jackson.

Currently most people today build one large application, i.e. single page app, for their projects which sits on top of a micro service architecture. Over time the frontend layer grows and gets more difficult to maintain.

[Microfrontends](https://livebook.manning.com/book/micro-frontends-in-action/chapter-1?origin=product-toc) are an alternative approach similar to micro services. Instead of having one single large application you have multiple applications. This allows different teams to work on different applications in a way that they can: 
 - be technology agnostic - each team is able to choose and upgrade their stack without having to coordinate with other teams.
 - not share a runtime, even if all teams use the same framework. The apps are self contained and don’t rely on shared state or global variables.
 - have independent deployments - one of the key features of the micro frontend is independent deployability. Irrespective of how or where the front-end code of the web app is hosted, eachapplication has its own continuous delivery pipeline. These pipelines are responsible for building, testing, and deploying each application all the way to production. As a result, teams have the freedom to move forward with their work without being interdependent on each other. Since they don't build the other applications it also makes these deployments faster.

The adoption of micro frontends is [motivated](https://arxiv.org/pdf/2007.00293.pdf) by the problems arising from working with massive monolothic front ends. These include:
 - the monolith frontend being hard to scale from a development point of view. The code of each micro-frontend will be by definition much smaller than the source code of a monolithic frontend. These smaller codebases tend to be simpler and easier for developers to work with. These scaling issues can take the form of:
   - overwhelming support responsibilties - over time the front-end grows so big that no team, let alone developer, can understand how the entire application works The front-end will eventually become more and more bloated and front-end projects will become more and more difficult to maintain. As a monolothic front end grows, so to do the responsibilities of those supporting it. 
   - onboarding difficulties - onboarding new developers is also difficult as the code base is too large and has too many edges to explore.  
   - coordination difficulties - While multiple teams are contributing to a monolithic application, the more tedious the development and release coordination becomes. 
 - in a front end monolith, changes apply across the whole frontend. All the rules applied to the code base are often decided once at the beginning of the project, and the teams stick with them for months or even years because changing a single decision would require a lot of effort across the entire code base. As a result, its development complexity rises exponentially with the number of teams modifying it. For example, when you upgrade the framework version in a monolith the whole monolith needs to be updated. The difficulty of this increases with the number of teams and amount of current changes occuring. Due to the nature of micro-frontend development teams can evolve a part of the application without affecting the entire system. In this way, testing a new version of a library or even a completely new UI framework won’t provide any harm to the application stability 
 -  Independent deployments. While updating a monolithic website or web application, you need to update it completely. You can’t update just one functionality while keeping the rest of the functionalities old because doing so will cause problems in the website. This increases the chance of breaking the application in production, introducing new bugs and mistakes especially when the code base is not tested extensively. With front-end separation to multiple smaller pieces, development teams achieve flexibility in development and operations.

There are many potential disadvantages to using microfrontends:
 - it’s challenging to track and debug errors in a vastly spread development process. 
 - you have to constantly handle different versioning of different application components across the entire system. 
 - there is a risk of browsers downloading duplicate code, as different teams are using different technologies to build the parts assigned to them.
 - some of the implementations of microfrontends (particularly looking at embedding iframes) can cause huge accessibility challenges.
 - if not designed and developed carefully, the front end of your application may not be able to facilitate consistent UI/UX.

The term [micro frontend anarchy](https://www.thoughtworks.com/radar/techniques/micro-frontend-anarchy) describes a potential problem with microfrontends:

 > this is the tendency to use the microfrontend architecture as an excuse to mix a range of competing technologies, tools or frameworks in a single page, leading to micro frontend anarchy. A particularly egregious form of this syndrome is using multiple frontend frameworks — for example, React.js and Angular — in the same "single-page" application. Although this might be technically possible, it is far from advisable when not part of a deliberate transition strategy. Other properties that should be consistent from team to team include the styling technique (e.g., CSS-in-JS or CSS modules) and the means by which the individual components are integrated (e.g., iFrames or web components). Furthermore, organizations should decide whether to standardize on consistent approaches or to leave it up to their teams to decide on state management, data fetching, build tooling, analytics and a host of other choices in a micro frontend application.

Some methods can be used to alleviate some of these issues:
 - force ownership of the whole process by autonomous teams - cross-functional teams is how microfrontends should be implemented. With cross-functional teams, teams have full ownership of everything, from ideation through to production and beyond. If a team owns the whole process, it reduces the organisational cost from communication when parts of the process are split ,e.g. between a backend and frontend team.
 - stick to a single framework choice and utilizing a coordination framework like [single-spa.js](https://single-spa.js.org/) so that you can mitigate much of the performance penalty by sharing resources & having common code downloaded only once. With a shared component library, you could eliminate many of the user experience inconsistency problems. Of course, at each step you give up some amount of independence. At some point, you no longer have a microfrontend architecture at all. 

## My opinion

microfrontends is an expensive solution and adopting an expensive solution should only be done when the costs justify it. In my opinion, if you have a multi year project with over 10 front end developers working on it, then microfrontends is something to consider to deal with the scaling issues that you will encounter. However, I also think that just using nrwl nx, i.e. mono repositories, is an approach that gives you alot of the same benefits with significantly less costs. With nx affected and computation caching, the build, lint and test operations should not be impacted by the work of teams working on different unrelated parts of the application. A similar organisational structure to microfrontends could also be used with a default nx project as long as you establish useful conventions for your folder structure. 

The disadvantage of normal nx vs. microfrontends is that with the nx approach you still need some awareness of what the other teams are doing, e.g. an effect name from one application could hit the effect in another application. With microfrontends, the teams are totally isolated. Therefore, it would be worth investigating microfrontends if it makes sense in your organisation for teams to be completely isolated from each other. A need for this might be when, even though it is not recommended, it makes sense for your organisation to have two teams using different frameworks or frameworks with different versions. 

Note having to upgrade a version in a monolith is a particular type of cost that often seeems worse than it is when compared to other costs. It is a cost that needs to be paid upfront and is very visible. This is different to upgrading in a microfront end that allows different framework versions as you can spread out the upgrade. This approach can seem less costly, but it often more costly it is just that the costs are less visible.