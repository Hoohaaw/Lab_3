export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      indent: ["error", 2],      // enforce 2 spaces
      semi: ["error", "always"], // require semicolons
      quotes: ["error", "double"],
      "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }], // no trailing empty lines
      "no-trailing-spaces": "error", // no trailing whitespace
      "eol-last": ["error", "always"], // newline at end of file
      "no-unused-vars": "warn", // warn about unused variables
      "eqeqeq": ["error", "always"], // require strict equality
      curly: "error" // require curly braces for all control statements
    }
  }
];
