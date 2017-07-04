const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: ['env']
  }
}

const i18nIniLoader = { /*
  loader: 'i18n-ini-loader', */
  loader: '../index.js',
  options: {
    language: 'de'
  }
}

module.exports = {
  entry: './index.js',
  output: {
    filename: './bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: babelLoader
      },
      {
        test: /\.ini$/,
        use: [
          babelLoader,
          i18nIniLoader
        ]
      }
    ]
  }
}