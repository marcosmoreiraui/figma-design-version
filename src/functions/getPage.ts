async function getPage () {
  const pageID: string = await figma.clientStorage.getAsync('dv-page')
  if (pageID) {
    const isPresent = figma.root.findOne(node => node.id === pageID && node.type === 'PAGE')
    if (isPresent) {
      return pageID
    }
  }
  return undefined
}

export default getPage
