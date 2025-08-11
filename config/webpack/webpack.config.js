// See the shakacode/shakapacker README and docs directory for advice on customizing your webpackConfig.
const { generateWebpackConfig } = require('shakapacker')

const options = {
  resolve: {
      extensions: ['.css', '.js', '.jsx']
  }
}


const webpackConfig = generateWebpackConfig(options)

module.exports = webpackConfig


// const { env } = require('shakapacker')
// const { existsSync } = require('fs')
// const { resolve } = require('path')

// const envSpecificConfig = () => {
//   const path = resolve(__dirname, `${env.nodeEnv}.js`)
//   if (existsSync(path)) {
//     console.log(`Loading ENV specific webpack configuration file ${path}`)
//     return require(path)
//   } else {
//     throw new Error(`Could not find file to load ${path}, based on NODE_ENV`)
//   }
// }

// module.exports = envSpecificConfig()