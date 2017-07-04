const ini = require('ini')
const loaderUtils = require('loader-utils')

const transform = string => {
  const regex =  /\$\{(.*?)\}/g

  const parameters = []
  let result
  while (result = regex.exec(string))
    parameters.push(result[1])

  return parameters.length
    ? `(${parameters.join(', ')}) => \`${string}\``
    : `'${string}'`
}

module.exports = function I18nIniLoader(source) {
  
  const { language } = Object.assign(
    { language: 'en' },
  	loaderUtils.getOptions(this)
  )

  try {
    
    const messages = Object.entries(
      ini.parse(source)
    )
    .map(([key, value]) => `  ${key}: ${transform(value[language])}`)
    .join(',\n')

    return `module.exports = {\n${messages}\n}`

  } catch (e) {
    throw new Error('An unexpected error occured:', e)
  }

}
