module.exports = {
	root: true,
	env: {
		node: true,
		es6: true,
	},
	extends: [
		"next/core-web-vitals",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
	],
	rules: {
		"@typescript-eslint/no-explicit-any": "warn",
	},
};
