const { resolve } = require('path');

module.exports = {
  resolve: {
    alias: {
      Assets: resolve(__dirname, '..', '..', 'app', 'assets'),
    },
  },
};