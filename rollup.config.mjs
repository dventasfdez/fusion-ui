import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import image from "@rollup/plugin-image";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import generatePackageJson from "rollup-plugin-generate-package-json";
import svg from "rollup-plugin-svg";
import postCss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";
import url from "postcss-url";
import autoprefixer from "autoprefixer";
import path from "path";

import { getFolders } from "./scripts/buildUtils.mjs";
import packageJson from "./package.json" assert { type: "json" };

const plugins = [
  peerDepsExternal(),
  typescript({
    tsconfig: "./tsconfig.json",
    useTsconfigDeclarationDir: true,
    exclude: ["**/*.test.tsx", "**/*.test.ts", "reportWebVitals.ts", "_app.tsx", "_document.tsx", "index.tsx", "helpers", "/helpers", "node_moudules", "index.tsx", "public"],
  }),
  svg(),
  image(),
  replace({
    // eslint-disable-next-line no-undef
    __IS_DEV__: process.env.NODE_ENV === "development",
    preventAssignment: true,
  }),
  resolve(),
  commonjs(),
  babel({
    babelHelpers: "bundled",
    exclude: "node_modules/**",
  }),
  terser(),
];

const subfolderPlugins = (folderName) => [
  ...plugins,
  resolve(),
  generatePackageJson({
    baseContents: {
      name: `${packageJson.name}/${folderName}`,
      private: true,
      main: "./index.js",
      module: "./index.esm.js",
      types: `./${folderName}.d.ts`,
    },
  }),
];
const folderBuilds = getFolders("./src/components").map((folder) => {
  if (folder === "forms") {
    return {
      input: `src/components/${folder}/index.tsx`,
      output: {
        file: `dist/${folder}/index.esm.js`,
        sourcemap: true,
        format: "esm",
      },
      plugins: subfolderPlugins(folder),
      external: ["react", "react-dom"],
    };
  }

  return {
    input: `src/components/${folder}/${folder}.tsx`,
    output: {
      file: `dist/${folder}/index.esm.js`,
      sourcemap: true,
      format: "esm",
    },
    plugins: subfolderPlugins(folder),
    external: ["react", "react-dom"],
  };
});

const folderBuildsCjs = getFolders("./src/components").map((folder) => {
  if (folder === "forms") {
    return {
      input: `src/components/${folder}/index.tsx`,
      output: {
        file: `dist/${folder}/index.js`,
        sourcemap: true,
        format: "cjs",
        exports: "named",
      },
      plugins: subfolderPlugins(folder),
      external: ["react", "react-dom"],
    };
  }

  return {
    input: `src/components/${folder}/${folder}.tsx`,
    output: {
      file: `dist/${folder}/index.js`,
      sourcemap: true,
      format: "cjs",
      exports: "named",
    },
    plugins: subfolderPlugins(folder),
    external: ["react", "react-dom"],
  };
});

const conf = [
  {
    input: "src/assets/styles/main.scss",
    output: {
      file: "dist/index.css",
      format: "es",
    },
    plugins: [
      postCss({
        to: "dist/index.css",
        extract: true,
        minimize: true,
        use: ["sass"],
        plugins: [
          autoprefixer(),
          url({
            url: "inline",
            maxSize: 10,
            basePath: ["../assets", "./assets"],
          }),
        ],
      }),
      copy({
        targets: [
          { src: "src/assets/fonts", dest: "dist/" },
          // {src: 'src/assets/icons', dest: 'dist/'},
          // {src: 'src/assets/images', dest: 'dist/'},
        ],
      }),
    ],
  },
  ...folderBuilds,
  ...folderBuildsCjs,
];
export default conf;
