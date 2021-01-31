// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration
const { readdirSync } = require('fs')

const exclude = readdirSync('.', { withFileTypes: true })
    .filter(dirent => dirent.name != 'assets' && !dirent.isDirectory())
    .map(dirent => {
      return dirent.isDirectory()
        ? `./${dirent.name}/**`
        : `./${dirent.name}`
    });

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  exclude: [
    '**/node_modules/**/*',
    '**/vendor/**/*',
  ],
  mount: {
    ['assets/snowpack']: { url: '/', static: true },
    ['scripts']: { url: '/dist' },
    /* ... */
  },
  plugins: [
    '@snowpack/plugin-babel',
    '@prefresh/snowpack',
    /* ... */
  ],
  packageOptions: {
    external: ["wp"],
    polyfillNode: true,
    // knownEntrypoints: ['./assets/src/frontend/index.js']
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    out: "assets/snowpack-build",
    clean: true,
    minify: false,
  },
  alias: {
    '@hooks': '@wordpress/element',
    '@render': '@wordpress/element',
  },
};
