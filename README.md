# Purpose
To document learnings from React.JS and ReactNative.JS.

# React.JS

## RenderProps.js
There are two learning points.

First, the use of `this.props.render`. This is a prop that isn't defined within components that `Mouse` is supposed to influence other components, i.e. `Cat` and `Dog`, with x- and y- coordinates from `Mouse`. But we do not want to hard-code the components that `Mouse` can influence. To achieve this, we call `this.props.render` in `Mouse`, which will pass x- and y- coordinates to the other components.

Second, we see how JSX in the exported prop `MouseTracker` can generate multiple select options. Here, `animalComponentsForRendering` is an object (in JavaScript's data types, this is a data structure with key-value pairs). We generate multiple select options with the following code:

`Object.keys(animalComponentsForRendering).map((k, idx) => <option value={k}>{k}</option>)`.

## BindFunction.js

This file demonstrates the importance of binding of `this`, i.e. the Component object, to a function.

`Button1` and `Button2` are two correct yet different approaches to executing a function. `Button3` is a modification of `Button1`, which leads to the function not having the Component object, and hence not being able to do things like update the Component object's state.

For more details, checkout these links [here](https://reactjs.org/docs/faq-functions.html) and [here](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/). The second link is instructive to understand what `this` means in the context of a JavaScript function.

## Routing

How does routing work on the client side, since there is no call to the server?
This post explains it: https://willtaylor.blog/foourl.
In brief, there are three parts. First, parsing of link (e.g. creating segments of URL split by '/') to find the right data in pre-stored template. Second, the url change is done via window.history.pushState. Third, the innerHTML is changed according to a pre-stored template.

## npm start

How does `npm start` package index.js into a html file to be served out, and not any other file like other.js?
Under the hood, webpack (with a HTML plugin) is converting index.js into a html file. The HTML plugin for webpack needs an entrypoint.

This entry point is in ./node_modules/react-scripts/config/paths.js. This exports appIndexJs, which is read into start.js in ./node_modules/react-scripts/start.js, i.e. what is run when we invoke `npm start`.

# ReactNative.JS

## npx react-native start

How does `npx react-native start` work?

`npx` looks at running `react-native` in the node_modules/.bin directory. This is the NodeJS script within `react-native`.
```
#!/usr/bin/env node
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

'use strict';

var cli = require('@react-native-community/cli');

if (require.main === module) {
  cli.run();
}

module.exports = cli;
```

Within `@react-native-community/cli`, there is a `package.json` file with the value "packages/*" for the `workspaces` key. What this means, is that all package.json in `packages/*` are effectively included in (or linked to) to the top level directory.

Within this `packages` directory, there is a directory named `platform-android`. This directory's `src/index.ts` contains a line:
```
export {default as commands} from './commands';
```

And within the directory `src/commands`, there is a file called `index.ts`, which in turn exports from a directory `runAndroid`, and contains the following lines within its `index.ts`.

```
export default {
  name: 'run-android',
  description:
    'builds your app and starts it on a connected Android emulator or device',
  func: runAndroid,
  options: [
    {
      name: '--root <string>',
      description:
        '[DEPRECATED - root is discovered automatically] Override the root directory for the android build (which contains the android directory)',
      default: '',
    },
    {
      name: '--variant <string>',
      description: "Specify your app's build variant",
      default: 'debug',
    },
    {
      name: '--appFolder <string>',
      description:
        '[DEPRECATED – use "project.android.appName" in react-native.config.js] Specify a different application folder name for the android source. If not, we assume is "app"',
    },
    {
      name: '--appId <string>',
      description:
        'Specify an applicationId to launch after build. If not specified, `package` from AndroidManifest.xml will be used.',
      default: '',
    },
    {
      name: '--appIdSuffix <string>',
      description: 'Specify an applicationIdSuffix to launch after build.',
      default: '',
    },
    {
      name: '--main-activity <string>',
      description: 'Name of the activity to start',
      default: 'MainActivity',
    },
    {
      name: '--deviceId <string>',
      description:
        'builds your app and starts it on a specific device/simulator with the ' +
        'given device id (listed by running "adb devices" on the command line).',
    },
    {
      name: '--no-packager',
      description: 'Do not launch packager while building',
    },
    {
      name: '--port <number>',
      default: process.env.RCT_METRO_PORT || 8081,
      parse: Number,
    },
    {
      name: '--terminal <string>',
      description:
        'Launches the Metro Bundler in a new window using the specified terminal path.',
      default: getDefaultUserTerminal(),
    },
    {
      name: '--tasks <list>',
      description: 'Run custom Gradle tasks. By default it\'s "installDebug"',
      parse: (val: string) => val.split(','),
    },
    {
      name: '--no-jetifier',
      description:
        'Do not run "jetifier" – the AndroidX transition tool. By default it runs before Gradle to ease working with libraries that don\'t support AndroidX yet. See more at: https://www.npmjs.com/package/jetifier.',
    },
  ],
};
```

## Bundling with Metro

Metro is like Webpack. It bundles JavaScript.

There are 3 stages to Metro:
1. Resolution
2. Transformation
3. Serialisation

If we wish to request a particular transformer for a file suffix, we have to modify both the resolution and transformation stages.

If we have multiple requests, we can instruct Metro to customise a transformer for each file suffix resolved, via another module [Stackoverflow link here](https://stackoverflow.com/questions/57656845/configure-multiple-transformers-resolvers-using-metro).

## Styling with `react-native-paper`

MaterialUI works for React, but not for ReactNative. `react-native-paper` is hence an implementation of MaterialUI that works for ReactNative.

### Fonts

Custom fonts are loaded in ./assets/fonts. Then, we amend `react-native.config.js` to indicate that there are font files in that directory.

```
module.exports = {
    project: {
        ios: {},
        android: {},
    },
    assets: ['./assets/fonts/'],
};
```

The next thing is to create a link, using the command `react-native link` (or add `npx` to the command.)

To set the custom font in react-native-paper's `Provider`, we can amend `DefaultTheme.fonts.<regular/medium etc.>.fontFamily`, or use the function `configureFonts` [link to function code here](https://github.com/callstack/react-native-paper/blob/main/src/styles/fonts.tsx).

## Hooks
The following applies to not just ReactNative, but also React.

But it came up in the course of learning ReactNative. In particular, Animation.

### Refs

```
const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 10000,
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}
```

What does `useRef(new Animated.Value(0)).current` do?

On ref.current:
- When the ref attribute is used on an HTML element, the ref created in the constructor with React.createRef() receives the underlying DOM element as its current property.
- When the ref attribute is used on a custom class component, the ref object receives the mounted instance of the component as its current.

So, in the above useRef(new Animated.Value(0)) creates a ref object to Animated.Value(0). .current then resolves it to the created item.

### Event hooks