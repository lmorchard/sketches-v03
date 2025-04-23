# lmorchard's sketches-v03

For years, I've tinkered with game development on the web. But, I haven't finished (m)any games. So, I decided to just focus more on finishing little interesting sketches of graphics and sound.

For this iteration, I'm thinking about moving toward the sketches being usable as web components. That way, I can share them in blog posts and do other fun things hopefully.

## Development

This should do the needful:
```
npm install
npm start
```

## Deployment

Push to main branch should kick off a GitHub Action to deploy to GitHub Pages. Otherwise, do this:
```
npm build
```

The `dist` folder is the output of the build process, and should be a self-contained static site.

## Build process

I'm trying a weird build process here: All external dependencies from NPM are collected under `lib/bundles` as modules reexporting the necessary bits. These are bundled up with code splitting via esbuild.

The rest of the code is modern vanilla JS that imports the bundles as ES modules. No transformation or build process involved outside the dependency bundles.

I'm hoping that this is a practical compromise between a minimal build process, shared modules that can be cached, and a little bit of future-proofing. Ideally, if the build process someday breaks, I can still use the last good bundle of frozen dependencies and tinker around with the rest of the code.
