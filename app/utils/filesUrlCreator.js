export const FilesUrlCreator = (file) => {
  const urlCreator = window.URL || window.webkitURL
  return urlCreator.createObjectURL(file)
}
