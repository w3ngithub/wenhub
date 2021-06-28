const path = require('path')
const withImages = require('next-images')

module.exports = withImages({
  target: 'serverless',
  sassOptions: {
    includePaths: [path.join(__dirname, 'app/styles')],
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
})
