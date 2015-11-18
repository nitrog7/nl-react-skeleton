NL React Falcor Skeleton
=======================

A simple skeleton to start you off on your ReactJS project. Uses Flux framework and Falcor.

Getting Started
---------------

Just clone the repo and install the necessary node modules:

```shell
$ npm install                   # Install Node modules listed in ./package.json (may take a while the first time)
$ npm install -g gulp           # Install Gulp
$ gulp                          # Compile and launch
```

Usage
-----

#### `gulp` also `gulp dev`
Runs the webpack build system just like in `compile` but enables HMR. The webpack dev server can be found at `localhost:3000`.

#### `gulp compile`
Runs the Webpack build system with your current NODE_ENV and compiles the application to disk (`~/dist`). Production builds will fail on eslint errors (but not on warnings).

#### `gulp test`
Runs unit tests with Karma.

#### `gulp deploy`
Helper script to run tests and then, on success, compile your application.

#### `gulp release`
Compile your application, then run web server.

### Configuration

Basic project configuration can be found in `~/build/config.js`. Here you'll be able to redefine your src and dist directories, as well as tweak what ports Webpack and WebpackDevServer run on.

Structure
---------

The folder structure provided is only meant to serve as a guide, it is by no means prescriptive. It is something that has worked very well for me and my team, but use only what makes sense to you.

```
.
├── build                    # All build-related configuration
│   ├── tasks                # Gulp configuration files
|   ├── config.js            # Project configuration settings
└── src                      # Application source code
|   ├── actions              # Flux actions
|   ├── components           # React components
|   ├── constants            # Flux constants
|   ├── dispatcher           # Flux dispatchers
|   ├── stores               # Flux stores
|   ├── styles               # CSS styles
|   ├── views                # Components that live at a route
|   ├── index.html           # Initial HTML page
|   └── main.js              # Application bootstrap and rendering
└── karma.conf.js            # Karma configuration settings
```

### Components vs. Views vs. Layouts

**TL;DR:** They're all components.

This distinction may not be important for you, but as an explanation: A **Layout** is something that describes an entire page structure, such as a fixed navigation, viewport, sidebar, and footer. Most applications will probably only have one layout, but keeping these components separate makes their intent clear. **Views** are components that live at routes, and are generally rendered within a **Layout**. What this ends up meaning is that, with this structure, nearly everything inside of **Components** ends up being a dumb component.

Webpack
-------

### Configuration
The webpack compiler configuration is located in `~/build/webpack`. When the webpack dev server runs, only the client compiler will be used. When webpack itself is run to compile to disk, both the client and server configurations will be used. Settings that are bundle agnostic should be defined in `~/build/config.js` and imported where needed.

### Vendor Bundle
You can redefine which packages to treat as vendor dependencies by editing `vendor_dependencies` in `~/config/index.js`. These default to:

```js
[
  'history',
  'react',
  'react-router',
  'flux'
]
```

### Aliases
As mentioned in features, the default Webpack configuration provides some globals and aliases to make your life easier. These can be used as such:

```js
import MyComponent from '../../components/my-component'; // without alias
import MyComponent from 'components/my-component'; // with alias

  // Available aliases:
  actions     => '~/src/actions'
  components  => '~/src/components'
  constants   => '~/src/constants'
  services    => '~/src/services'
  styles      => '~/src/styles'
  utils       => '~/src/utils'
  views       => '~/src/views'
  test        => '~/test'
```

### Globals

#### `__DEV__`
True when `process.env.NODE_ENV` is `development`

#### `__PROD__`
True when `process.env.NODE_ENV` is `production`

#### `__DEBUG__`
True when the compiler is run with `--debug` (any environment).

Styles
------

All `.scss` imports will be run through the sass-loader, extracted during production builds, and ignored during server builds. If you're requiring styles from a base styles directory (useful for generic, app-wide styles) in your JS, you can make use of the `styles` alias, e.g.:

```js
// ~/src/components/some/nested/component/index.jsx
import `styles/core.scss`;
```

Furthermore, this `styles` directory is aliased for sass imports, which further eliminates manual directory traversing. An example nested `.scss` file:

```scss
// current path: ~/src/styles/some/nested/style.scss
// what used to be this:
@import '../../base';

// can now be this:
@import 'base';
```

Testing
-------

To add a unit test, simply create `.spec.js` file anywhere in `~/test/unit`. All imports will be relative to the "~/src" directory. The entry point for Karma uses webpack's custom require to load all these files, and Jasmine will be available to you within your test without the need to import them.

Troubleshooting
---------------

Nothing yet. Having an issue? Report it and I'll get to it as soon as possible!
