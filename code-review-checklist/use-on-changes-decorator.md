---
title: Use OnChanges decorator
description: Use the OnChanges decorator which is simpler than OnChanges and less verbose then setters
category: Readability
publishedDate: 14/2/2020
published: true
---

# Use OnChanges decorator

## Problem

When it comes to handling changes, the most common approach is the ngOnChanges lifecycle hook.

```ts
ngOnChanges(changes: SimpleChanges) {
  if (changes.key1) {
      console.log(`key1 is changed from ${changes.key1.previousValue} to ${changes.key1.currentValue}`);
  }
  // ...
}
```

OnChanges has some disadvantages:

- It combines change detection of ALL input properties into one ngOnChanges hook function. And then we need to separate those properties with an if statement making it less readable especially when there are many properties to be watched.
- The interface of SimpleChanges accepts any string as its key, making it possible for typos. For example, changes.typo_key will not be complained about by the TypeScript compiler.
- SimpleChange.previousValue and SimpleChange.currentValue are typed to any instead of the desired property type.

A common alternative to ngOnChanges is to use a setter function.

```ts
export class AppComponent {
  private _title: string;

  @Input()
  set title(value: string) {
    this._title = value;
    console.log(`title is changed to ${value}`);
  }

  get title(): string {
    return this._title;
  }
}
```

Advantages

- This decouples the different properties. The setter function (on-change hook) is located together with @Input() for better readability.

Disadvantages

- A “private” ghost property \_title needs to be created. Furthermore, it is not really “private” as \_title is still accessible and changeable anywhere inside the component, which is not what we really want. What we wanted is that the title can only be read/written though getter/setter functions. But, this is not enforced.
- Lengthy code: I just want to subscribe to title change, why do I have to bother introducing \_title and a getter function.

## Solution

[OnChanges decorator](https://www.npmjs.com/package/property-watch-decorator)

```ts
export class AppComponent {
  @OnChange<string>(function(value, simpleChange) {
    console.log(`title is changed to: ${value}`);
  })
  @Input()
  title: string;
}
```

This has the following advantages:

- Intuitive, easy to use, less code, better readability.
- As powerful as ngOnChanges since simpleChange is available
- Hide cachedValue from developer, no more “ghost property”.
- Better typing. SimpleChange.previousValue is typed to a generic type.

## Resources

- [Creatively Decouple ngOnChanges](https://medium.com/angular-in-depth/creatively-decouple-ngonchanges-fab95395cc6e)
