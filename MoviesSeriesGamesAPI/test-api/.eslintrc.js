module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'next',
    "plugin:react/recommended"
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off'
  }
}
