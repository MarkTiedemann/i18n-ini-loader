# i18n-ini-loader

**Webpack I18n loader based on .ini files.**

## Installation

```
npm install i18n-ini-loader
```

## Quickstart

**Input:**

`messages.ini`
```ini
[hello]
en=Hello, ${name}!
de=Hallo, ${name}!

[niceDay]
en=Have a nice day.
de=Hab einen schönen Tag.
```

**Config:**

`webpack.config.js`
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.ini$/,
        use: [
          {
            loader: 'i18n-ini-loader',
            options: {
              language: 'de',
              failOnMissingTranslation: true
            }
          }
        ]
      }
    ]
  }
}

// Note: Since the output of the `i18n-ini-loader` uses ES6 template strings
// and arrow functions (see below), you may want to chain the `babel-loader`
// for ES5 support.
// Check out the `/example` directory for a simple example config.
```

**Output:**

```js
module.exports = {
  welcome: (name) => `Hallo, ${name}!`,
  niceDay: 'Hab einen schönen Tag.'
}
```

**Usage:**

`Welcome.jsx`
```jsx
import { hello, niceDay } from './messages.ini'

export default function Welcome({ name }) {
  return (
    <div>
      <h1>{hello(name)}</h1>
      <span>{niceDay}</span>
    </div>
  )
}

// <div>
//   <h1>Hallo, Mark!</h1>
//   <span>Hab einen schönen Tag.</span>
// </div>
```

## Options

- **`language`**: the language key used for translation (*default*: `en`)
- **`failOnMissingTranslation`**: whether an `Error` should be thrown if missing translations are found (*default*: `true`); if `false`, missing translations will be handled gracefully by returning an empty `String` (`''`)

## License

[WTFPL](http://www.wtfpl.net/) – Do What the F*ck You Want to Public License.

Made with :heart: by [@MarkTiedemann](https://twitter.com/MarkTiedemannDE).