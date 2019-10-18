const {mix}  = require('laravel-mix')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// module.exports = {
//   vue: {
//     loaders: {
//       js: 'babel-loader',
//       scss: 'vue-style-loader!css-loader!sass-loader'
//     }
//   }
// };

mix.sass('resources/assets/sass/client/app.scss', 'public/css')
mix.sass('resources/assets/sass/admin/admin.scss', 'public/css')

mix.js('resources/assets/js/scripts.js', 'public/js')
mix.babel('resources/assets/js/scripts/*.js', 'public/js/app.js')
mix.js('resources/assets/js/admin/admin.js', 'public/js/admin-scripts.js')

mix.version();
