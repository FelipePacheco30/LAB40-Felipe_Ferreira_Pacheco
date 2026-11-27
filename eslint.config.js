"use strict";

module.exports = [
  {
    files: ["**/*.js"],
    ignores: ["node_modules/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        URL: "readonly",
        __dirname: "readonly",
        console: "readonly",
        document: "readonly",
        fetch: "readonly",
        process: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-var": "error",
      "prefer-const": "error"
    }
  }
];
