async function getPage () {
  const pageID: string = await figma.clientStorage.getAsync('changelog-frame')
  if (pageID) {
    return pageID
  }
  const cvPage = figma.root.findOne((node) => node.name === 'changelog-dv')
  await figma.clientStorage.setAsync('changelog-frame', cvPage?.id)
  return cvPage?.id
}

export default getPage
