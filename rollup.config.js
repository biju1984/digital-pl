// rollup.config.js
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
// Convert CJS modules to ES6, so they can be included in a bundle
import commonjs from "rollup-plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import postcssModules from "postcss-modules";
import svg from "rollup-plugin-svg";

const cssExportMap = {};
export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "cjs"
  },
  external: [
    "react",
    "react-proptypes",
    "crypto",
    "stream",
    "react-virtualized"
  ],
  plugins: [
    resolve({
      mainFields: ["index"],
      extensions: [".mjs", ".js", ".jsx", ".json"],
      dedupe: ["react", "react-dom"]
    }),
    svg(),
    postcss({
      plugins: [
        postcssModules({
          getJSON(id, exportTokens) {
            cssExportMap[id] = exportTokens;
          }
        })
      ],
      getExportNamed: false,
      getExport(id) {
        return cssExportMap[id];
      },
      extract: "dist/styles.css"
    }),
    babel({
      exclude: "node_modules/**"
    }),
    commonjs(),
    terser()
  ]
};
