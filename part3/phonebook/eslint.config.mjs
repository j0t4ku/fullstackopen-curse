import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-prototype-builtins": "off",
      "no-misleading-character-class": "off",
      "no-useless-escape": "off",
      "no-cond-assign": "off",
      "no-empty": "off",
      "getter-return": "off",
      "valid-typeof": "off",
      "no-fallthrough": "off",
      "no-constant-condition": "off",
      "no-func-assign": "off",
      "no-control-regex": "off"
    }
  }
];