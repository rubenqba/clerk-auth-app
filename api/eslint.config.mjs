// @ts-check

import eslint from "@eslint/js";
import tseslint from 'typescript-eslint';
import seceslint from 'eslint-plugin-security';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  seceslint.configs.recommended,
  {
    ignores: ['*.d.ts'],
  },
);