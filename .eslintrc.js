module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
    "prettier"
  ],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "import/prefer-default-export": "off",
    "import/named": "off",
    "import/no-named-as-default": "off",
    "no-shadow": "off",
    "no-underscore-dangle": "off",
    "vuejs-accessibility/click-events-have-key-events": "off",
    "import/no-cycle": "off",
    "vuejs-accessibility/no-autofocus": "off",
    "vuejs-accessibility/mouse-events-have-key-events": "off",
    'camelcase': 'off',
  },
};
