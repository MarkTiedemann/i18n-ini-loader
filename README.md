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
[welcome]
en=Welcome, ${user}!
de=Willkommen, ${user}!

[niceDay]
en=Have a nice day!
de=Hab einen schönen Tag!
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
              language: 'de'
            }
          }
        ]
      }
    ]
  }
}
```

**Output:**

```js
module.exports = {
  welcome: (user) => `Willkommen, ${user}!`,
  niceDay: 'Hab einen schönen Tag!'
}
```

**Usage:**

`Component.js`
```jsx
import { welcome, niceDay } from './messages.ini'

export default function Welcome({ user }) {
  return (
    <div>
      <h1>{welcome(user)}</h1>
      <span>{niceDay}</span>
    </div>
  )
}
```

## License

[WTFPL](http://www.wtfpl.net/) – Do What the F*ck You Want to Public License.

Made with :heart: by [@MarkTiedemann](https://twitter.com/MarkTiedemannDE).