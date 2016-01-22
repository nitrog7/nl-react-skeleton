NL React Skeleton
=======================

A simple skeleton to start you off on your ReactJS project. Uses the following:

- React v0.14.6 (https://facebook.github.io/react)
- React Router v2.0.0-rc5 (https://github.com/rackt/react-router)
- NL Flux v0.1.4 (http://https://github.com/nitrog7/nl-flux)
- Falcor v0.1.15 (http://netflix.github.io/falcor)

Checkout additional skeleton versions:

- Falcor (https://github.com/nitrog7/nl-react-skeleton/tree/falcor)

Getting Started
---------------

Just clone the repo and install the necessary node modules:

```shell
$ npm install                   # Install Node modules listed in ./package.json (may take a while the first time)
$ npm install -g gulp           # Install Gulp
$ npm install -g nodemon        # Install Nodemon
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

#### `gulp doc`
Generate documentation using YUIDoc (http://yui.github.io/yuidoc/)

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
|   └── config.js            # Project configuration settings
├── model                    # Routes used by Falcor
│   ├── routes               # Falcor routes
|   └── router.js            # Falcor router
└── src                      # Application source code
|   ├── actions              # Flux actions
|   ├── components           # React components
|   ├── constants            # Flux constants
|   ├── stores               # Flux stores
|   ├── styles               # CSS styles
|   ├── views                # Components that live at a route
|   ├── index.html           # Initial HTML page
|   └── main.js              # Application bootstrap and rendering
└── karma.conf.js            # Karma configuration settings
```

Webpack
-------

### Configuration
The webpack compiler configuration is located in `~/build/webpack`. When the webpack dev server runs, only the client compiler will be used. When webpack itself is run to compile to disk, both the client and server configurations will be used. Settings that are bundle agnostic should be defined in `~/build/config.js` and imported where needed.

### Vendor Bundle
You can redefine which packages to treat as vendor dependencies by editing `vendor_dependencies` in `~/config/index.js`. These default to:

```js
[
  'lodash',
  'falcor',
  'falcor-http-datasource',
  'falcor-json-graph',
  'nl-flux',
  'react',
  'react-addons-update',
  'react-dom',
  'react-router'
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
  stores      => '~/src/stores'
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
