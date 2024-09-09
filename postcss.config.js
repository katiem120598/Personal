const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    purgecss({
      content: ['./**/*.html', './assets/js/*.js'], // Corrected content paths
      css: ['./assets/css/combined.css'], // Corrected CSS path
      output: './assets/', // Corrected output path
    })
  ]
}