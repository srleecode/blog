---
title: Do not use relative references in sass imports
description: Using relative references to import files is painful and error-prone.
tags: Software development
publishedDate: 28/3/2020
published: true
---

# Do not use relative references in sass imports

Using relative references to import files is painful and error-prone. In typescript this problem is solved using tsconfig path aliases, but an equivalent solution doesn't exist for sass. Here are some options you can try instead.

## Problem example:

```css
@import '../../../../shared/ui/src/lib/colors';
```
 - Did I use the right number of "../"s?
 - When I move the colors file, I'll have to update the import paths in every file that references it. The solutions below address the first concern, but not the second.

## Possible solutions:

### 1. Use absolute references in sass imports.
   
```css
@import 'libs/shared/ui/src/lib/colors';
```

You can also use ~ to start from the node_modules folder.

```css
@import '~@angular/material/_theming';
```

### 2. Use includePaths to tell sass to check multiple base folders for your imports.

If a lot of your sass imports reference the same libs/shared/ui/src/lib folder, it might be helpful to be able to write your sass imports like this:
```css
@import 'colors';
```

In order to make this work, you need to edit your angular.json configuration for each app that you want this path included in.

```json 
"projects": [
  "my-app": {
    "architect": {
      "build": {
        "options": {
          "stylePreprocessorOptions": {
            "includePaths": ["libs/shared/ui/src/lib"]
          }
        }
      }
    }
  }
]
```