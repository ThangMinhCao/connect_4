module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    "plugin: react/recommended",
    airbnb
  ],
  parser : "babel-eslint",
  parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 11,
      sourceType: "module"
  },
  plugins: [
    "react"
  ],
  rules: {
    "react/prefer-stateless-function": [1],
    "react/destructuring-assignment": [0]
  }
};