async function getPage () {
  const pageID: string = await figma.clientStorage.getAsync('dv-page')
  if (pageID) {
    const isPresent = figma.getNodeById(pageID)
    if (isPresent) {
      return pageID
    }
  }
  return undefined
}

export default getPage
