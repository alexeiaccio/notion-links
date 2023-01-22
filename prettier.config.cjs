/** @type {import("prettier").Config} */
module.exports = {
  semi: false,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};
