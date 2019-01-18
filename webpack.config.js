var path = require('path');

module.exports = {
  mode: 'production',
  entry: {
  	lifer: './src/app.js',
  	sw: './src/workers/sw.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  }
};