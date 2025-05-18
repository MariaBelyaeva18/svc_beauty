module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'import',
  ],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "camelcase": "off",
    'no-console': ['error', { allow: ['error'] }],
    "import/prefer-default-export": "off",
    "no-useless-constructor": "off",
    "dot-notation": "off",
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "class-methods-use-this": "off",
    'indent': 'off',
    "import/no-extraneous-dependencies": "warn",
    "import/order":
      [
        1,
        {
          "groups":
            [
              "external",
              "builtin",
              "internal",
              "sibling",
              "parent",
              "index"
            ],
          "pathGroups": [
            {
              "pattern": "components",
              "group": "internal"
            },
            {
              "pattern": "common",
              "group": "internal"
            },
            {
              "pattern": "routes/ **",
              "group": "internal"
            },
            {
              "pattern": "assets/**",
              "group": "internal",
              "position": "after"
            }
          ],
          "pathGroupsExcludedImportTypes":
            ["internal"],
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          }
        }
      ],
    "@typescript-eslint/no-var-requires": "off",
    "no-underscore-dangle": "off",
    "no-control-regex": "off",
    "no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "no-async-promise-executor": "warn",
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "parser": "typescript",
        "trailingComma": "all",
        "tabWidth": 2,
        "printWidth": 100
      },
      {
        "usePrettierrc": false
      }
    ]
  },
  "overrides": [
    {
      "files": "*.model.ts",
      "rules": {
        "import/no-cycle": "warn",
      }
    }
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    }
  }
};
