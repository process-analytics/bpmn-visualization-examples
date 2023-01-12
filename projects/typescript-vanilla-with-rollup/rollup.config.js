/**
 * Copyright 2020 Bonitasoft S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import copy from "rollup-plugin-copy";
import copyWatch from "rollup-plugin-copy-watch";

import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import { string } from "rollup-plugin-string";
import pkg from "./package.json";

const devMode = process.env.devMode ?? false;

const plugins = [
  typescript(),
  resolve(),
  commonjs(), // at least required to bundle mxGraph with is a CommonJS module
  string({include: "**/*.bpmn"}), // let import the BPMN diagram in the TypeScript code
];

// Copy static resources to dist
const copyTargets = [];
copyTargets.push({src: "src/*.html", dest: "dist/"});
copyTargets.push({src: "src/static", dest: "dist"});
let copyPlugin;
if (devMode) {
  copyPlugin = copyWatch({
    watch: ["src/static/**", "src/*.html"],
    targets: copyTargets,
  });
} else {
  copyPlugin = copy({
    targets: copyTargets,
  });
}
plugins.push(copyPlugin);

if (devMode) {
  // Create a server for dev mode
  plugins.push(serve({contentBase: "dist", port: 10001}));
  // Allow to livereload on any update
  plugins.push(livereload({watch: "dist", verbose: true}));
} else {
  plugins.push(terser({ecma: 2015}));
}

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.module,
        format: "es",
        sourcemap: true,
      },
    ],
    plugins: plugins,
  },
];
