module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
  plugins: ["jest"],
};
