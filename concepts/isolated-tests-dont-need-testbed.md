---
title: Isolated tests don't need TestBed
description: Isolated tests can be written without Testbed and adding Testbed only makes the tests slower 
tags: Software development
publishedDate: 28/3/2020
published: true
---

# Isolated tests don't need TestBed

When you test both the template and the class together in one test you are:
 - doomed to slow tests (TestBed takes time to boot up and wire the test module) — this is especially bad for TDD since you want to run all your tests every 20–30 seconds
 - not really testing one thing (the component logic) but also Angular functionality itself — in order for your test to be a unit test (i.e. a useful tool pinpointing the cause of the problem when it occurs), the scope of things that can fail the tests needs to be small
 - coupling your tests to a 3rd party framework, making it difficult to refactor (for example — to move the behaviour deeper into the architecture where it is no longer in a @Component)

To write these isolated tests:
 - Test using just the class
 - Minimise logic in the template. Move any advanced template logic into functions in the class
 - Test the template using story book UI tests
 - Use [ts-mockito](https://github.com/NagRock/ts-mockito#readme) to mock out injected services or other dependencies

Useful links:

 - [You're Testing Your Angular Code Wrong (Probably)](https://www.youtube.com/watch?v=7JucMlrs3dQ)
 - [testing-angular-services-skip-the-testbed](https://www.rallyhealth.com/coding/testing-angular-services-skip-the-testbed)
 - [Unit Testing Angular: TestBed Considered Harmful](https://medium.com/@marko.bjelac/unit-testing-angular-testbed-considered-harmful-7e2bb8f32586)