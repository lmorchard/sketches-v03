import * as esbuild from "esbuild";
import fs from "node:fs/promises";
import path from "node:path";

const CLIENT_SRC_PATH = "./src";
const CLIENT_BUILD_PATH = "./dist";

//const CLIENT_ASSETS_SRC_PATH = `${CLIENT_SRC_PATH}/assets`;
//const CLIENT_ASSETS_BUILD_PATH = `${CLIENT_BUILD_PATH}/assets`;

const entryPoints = [
  "lib/vendor/pixi.js",
  "lib/BaseSketch.js",
  "sketches/VectorAvatar/VectorAvatar.js",
  "index.js", 
];

async function main() {
  await Promise.all([
    /*
    // Copy over plain assets
    (async () => {
      await fs.rm(CLIENT_ASSETS_BUILD_PATH, { recursive: true, force: true });
      await fs.mkdir(CLIENT_ASSETS_BUILD_PATH, { recursive: true });
      await fs.cp(CLIENT_ASSETS_SRC_PATH, CLIENT_ASSETS_BUILD_PATH, {
        recursive: true,
      });
    })(),
    */
    // Build JS and imported CSS
    esbuild.build({
      absWorkingDir: path.resolve(CLIENT_SRC_PATH),
      // minify: true, // someday, i suppose?
      // implicitly, index.css is produced as well
      entryPoints,
      bundle: true,
      splitting: true,
      outdir: path.resolve(CLIENT_BUILD_PATH), //'dist',
      format: 'esm',
    }),
  ]);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});