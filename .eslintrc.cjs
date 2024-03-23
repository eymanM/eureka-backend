// This module exports the configuration for ESLint, a tool for identifying and reporting on patterns in JavaScript.
module.exports = {
  // Specifies the environments where your code is designed to run.
  env: {
    browser: true, // Enables browser global variables.
    es2021: true // Enables all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12.
  },
  // A set of named configurations that you want to extend.
  extends: [
    'eslint:recommended', // This configuration represents a set of rules which are recommended by the ESLint team.
    'plugin:@typescript-eslint/recommended', // A configuration that turns on TypeScript-specific rules from the @typescript-eslint plugin.
    'plugin:security/recommended', // Turns on all the rules from the eslint-plugin-security.
    'plugin:import/recommended', // Turns on all the rules that help validate proper imports.
    'plugin:import/typescript' // This is a special configuration for handling TypeScript files.
  ],
  // Specifies configuration for files matching specific patterns.
  overrides: [
    {
      env: {
        node: true // Enables Node.js global variables and Node.js scoping.
      },
      files: [
        '.eslintrc.{js,cjs}' // Applies the configuration to JavaScript and CommonJS ESLint configuration files.
      ],
      parserOptions: {
        sourceType: 'script' // Indicates that the source code is not using ECMAScript modules.
      }
    }
  ],
  // Specifies the parser to be used by ESLint.
  parser: '@typescript-eslint/parser', // The parser that allows ESLint to lint TypeScript code.
  // Specifies parser options.
  parserOptions: {
    ecmaVersion: 'latest', // Specifies the version of ECMAScript syntax you want to use.
    sourceType: 'module' // Indicates that your code uses ECMAScript modules.
  },
  // Specifies a list of plugins to load.
  plugins: [
    '@typescript-eslint', // The plugin that contains all the TypeScript-specific rules.
    'unused-imports', // The plugin that helps identify unused imports, variables, etc.
  ],

  rules: {
    "max-len": ["error", { "ignoreComments": true, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreRegExpLiterals: true, "code": 135 }],
    "@typescript-eslint/no-unused-vars": ["warn"],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    'prefer-const': 'warn',
    indent: ['warn', 2],
    "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    'linebreak-style': 'off',
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    "import/no-unresolved": [
        "error",
        {
            ignore: ["aws-lambda"]
        }
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true, // don"t want to sort import lines, use eslint-plugin-import instead
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true,
      },
    ],
    'object-curly-spacing': ['error', 'never', { 'arraysInObjects': true }],
    "unused-imports/no-unused-imports": "error",
		"unused-imports/no-unused-vars": [
			"warn",
			{ "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
		],
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Built-in imports (come from Node.js native) go first
          'external', // <- External imports
          'internal', // <- Absolute imports
          ['sibling', 'parent'], // <- Relative imports, the sibling and parent types they can be mingled together
          'index', // <- index imports
          'unknown', // <- unknown
        ],
        'newlines-between': 'always',
        alphabetize: {
          /* Sort in ascending order. Options: ["ignore", "asc", "desc"] */
          order: 'asc',
          /* ignore case. Options: [true, false] */
          caseInsensitive: false,
        },
      },
    ],
  },
};
