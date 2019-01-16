var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'lifer.bundle.js'
  }
};