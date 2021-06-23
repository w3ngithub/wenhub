const path = require('path')
const withImages = require('next-images')

module.exports = withImages({
  sassOptions: {
    includePaths: [path.join(__dirname, 'app/styles')],
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
})
