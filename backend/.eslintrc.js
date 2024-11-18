module.exports = {
  env: {
    node: true, // Specifies the Node.js environment
    es2021: true, // Supports ES2021 features
  },
  parser: "@typescript-eslint/parser", // Uses TypeScript parser
  parserOptions: {
    ecmaVersion: 2021, // Supports modern JavaScript syntax
    sourceType: "module", // Allows for the use of ES modules (import/export)
  },
  plugins: ["@typescript-eslint"], // Adds TypeScript ESLint plugin
  extends: [
    "eslint:recommended", // Uses recommended ESLint rules
    "plugin:@typescript-eslint/recommended", // Uses recommended TypeScript ESLint rules
  ],
};

