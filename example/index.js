const { welcome, niceDay, asList } = require('./messages.ini')

console.log(
  asList(
    welcome('Mark'),
    niceDay
  )
)