// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },

  // required to lint *.vue files
  plugins: [
    'vue',
  ],

  // 优先使用vue强烈推荐的配置和标准配置，其余配置在rules中修改
  extends: [
    'plugin:vue/strongly-recommended',
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },

  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    camelcase: 0,
    semi: [0],
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'quote-props': [
      'error',
      'as-needed',
    ],
    'array-callback-return': 'error',
    'prefer-destructuring': [
      'error',
      {
        array: true,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'template-curly-spacing': [
      'error',
      'always',
    ],
    'prefer-template': 'error',
    'no-eval': 'error',
    'no-useless-escape': 'error',
    'no-array-constructor': 'error',
    'vue/max-attributes-per-line': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'accessor-pairs': [
      'error',
      {
        setWithoutGet: true,
        getWithoutSet: true,
      },
    ],
    'newline-per-chained-call': 'error',
    'array-bracket-spacing': [
      'error',
      'never',
    ],
    'line-comment-position': [
      'error',
      {
        position: 'above',
      },
    ],
    'lines-around-comment': [
      'error',
      {
        beforeLineComment: true,
        allowBlockStart: true,
      },
    ],
    'no-inline-comments': 'error',
    'no-nested-ternary': 'error',
    'dot-notation': 'error',
    'one-var': [
      'error',
      'never',
    ],
    'no-multi-assign': 'error',
    'no-plusplus': 'error',
    'operator-linebreak': [
      'error',
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before',
          '=': 'none',
        },
      },
    ],
    'func-style': [
      'error',
      'expression',
    ],
    'no-loop-func': 'error',
    'prefer-rest-params': 'error',
    'no-param-reassign': [
      'error',
      {
        props: true,
      },
    ],
    'prefer-spread': 'error',
    'function-paren-newline': 'error',
    'no-new-func': 'error',
    'space-before-function-paren': 'error',
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: true,
        allowUnboundThis: true,
      },
    ],
    'arrow-body-style': [
      'error',
      'as-needed',
    ],
    'arrow-parens': [
      'error',
      'as-needed',
    ],
    'no-confusing-arrow': 'error',
    'implicit-arrow-linebreak': [
      'error',
      'beside',
    ],
    'no-useless-constructor': 'error',
    'no-dupe-class-members': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'generator-star-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    'max-len': [
      'error',
      {
        code: 200,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
      },
    ],
    'no-mixed-operators': 'error',
    'no-unneeded-ternary': 'error',
    'nonblock-statement-body-position': [
      'error',
      'any',
    ],
    'brace-style': 'error',
    'no-else-return': 'error',
    'id-length': 'error',
    'no-underscore-dangle': 'error',
    'linebreak-style': 0,
  },
};
