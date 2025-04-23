import * as esbuild from "esbuild";
import fs from "node:fs/promises";
import { glob } from "glob";
import path from "node:path";
import copy from "recursive-copy";

const CLIENT_SRC_PATH = "./src";
const CLIENT_BUILD_PATH = "./dist";

const staticAssetsFilters = [
  "**/*.js",
  "**/*.html",
  "**/*.css",
  "**/*.png",
  "**/*.jpg",
  "**/*.jpeg",
  "**/*.gif",
  "**/*.svg",
  "**/*.webp",
  "**/*.mp4",
  "**/*.webm",
  "**/*.ogg",
  "**/*.mp3",
  "**/*.wav",
];

async function main() {
  // Clean the build directory
  try {
    await fs.rm(CLIENT_BUILD_PATH, { recursive: true, force: true });
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("Error removing build directory:", error);
      process.exit(1);
    }
  }
  await fs.mkdir(CLIENT_BUILD_PATH, { recursive: true });

  // Copy static assets to build
  await copy(path.resolve(CLIENT_SRC_PATH), path.resolve(CLIENT_BUILD_PATH), {
    filter: staticAssetsFilters,
    overwrite: true,
    expand: true,
    dot: true,
  }).on(copy.events.COPY_FILE_COMPLETE, (copyOperation) => {
    console.log(`Copied ${copyOperation.src} to ${copyOperation.dest}`);
  });

  // Bundle up dependencies
  await esbuild.build({
    absWorkingDir: path.resolve(CLIENT_SRC_PATH, "lib", "bundles"),
    outdir: path.resolve(CLIENT_BUILD_PATH, "lib", "bundles"),
    entryPoints: await glob(
      path.resolve(CLIENT_SRC_PATH, "lib", "bundles", "**/*.js"),
      { nodir: true }
    ),
    minify: true,
    bundle: true,
    splitting: true,
    sourcemap: true,
    format: "esm",
    logLevel: "info",
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
