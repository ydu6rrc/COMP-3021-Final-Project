import eslint from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{
		ignores: [
			"**/dist/*",
			"**/coverage/*",
			"**/.github/*",
			"eslint.config.mjs",
			"jest.config.ts",
		],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: "./tsconfig.json",
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		files: ["**/*.ts", "**/*.tsx"],
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
			],

			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/typedef": "off",

			"@typescript-eslint/consistent-type-imports": [
				"error",
				{ prefer: "type-imports" },
			],

			"@typescript-eslint/no-require-imports": "off",
			"n/no-missing-import": "off",
			"n/no-unpublished-import": "off",
			"n/no-unsupported-features/node-builtins": "off",
			"no-useless-assignment": "off",
		},
	},
);
