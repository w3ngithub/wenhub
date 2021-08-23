export function formatData(dataToformat = '') {
  const stringDataToFormat = dataToformat.toString()
  if (stringDataToFormat.includes('.')) {
    const splitData = stringDataToFormat.split('.')
    return `${splitData[0]}.${splitData[1].substring(0, 2)}`
  }
  return stringDataToFormat
}
