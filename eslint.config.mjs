import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Convert common errors to warnings
      "no-console": "warn",
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "no-unreachable": "warn",
      "no-empty": "warn",
      "no-useless-escape": "warn",
      "no-constant-condition": "warn",
      "no-case-declarations": "warn",
      "prefer-const": "warn",

      // React specific rules
      "react-hooks/exhaustive-deps": "warn",
      "react/no-unescaped-entities": "warn",
      "react/display-name": "warn",

      // Next.js specific rules
      "@next/next/no-img-element": "warn",
      "@next/next/no-html-link-for-pages": "warn",

      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
    },
  },
];

export default eslintConfig;
