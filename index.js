const ini = require('ini')

const collectMatchingGroups = (regex, string) => {

  const groups = []

  let match
  while (match = regex.exec(string))
    groups.push(match[1])

  return groups
}

const transform = message => {

  const findParameters = /\$\{(.*?)\}/g
  const parameters = collectMatchingGroups(findParameters, message)
  const hasParameters = parameters.length > 0

  return hasParameters
    ? `(${parameters.join(', ')}) => \`${message}\``
    : `'${message}'`
}

const getMessage = ({ section, messages, options, loader }) => {

  const message = messages[options.language]

  if (message !== undefined)
    return message

  if (!options.failOnMissingTranslation)
    return ''

  throw new Error(`Missing translation for language '${options.language}' `
    + `in section '${section}': ${loader.request}`)
}

module.exports = function I18nIniLoader(source) {

  const options = Object.assign(
    {
      language: 'en',
      failOnMissingTranslation: true
    },
    this.query
  )

  const messages = Object.entries(
    ini.parse(source)
  )
  .map(entry => {
    const [ section, messages ] = entry
    const message = getMessage({ section, messages, options, loader: this })
    const messageOrFunction = transform(message)
    return `  ${section}: ${messageOrFunction}`
  })
  .join(',\n')

  return `module.exports = {\n${messages}\n}`
}
