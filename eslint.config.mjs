import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "react/no-inline-styles": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];
