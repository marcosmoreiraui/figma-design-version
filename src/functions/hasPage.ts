async function hasPage () {
  const frameID: string = await figma.clientStorage.getAsync('changelog-frame')
  const getFrame = figma.root.findOne(node => node.id === frameID && node.type === 'FRAME')
  if (frameID && getFrame) {
    return true
  }
  const pageID: string = await figma.clientStorage.getAsync('page')
  if (pageID) {
    const page = figma.root.findOne(node => node.id === pageID && node.type === 'PAGE')
    if (page && page?.type === 'PAGE') {
      const frameNode = page.findOne(node => node.type === 'FRAME' && node.name === 'changelog-dv')
      if (frameNode) {
        await figma.clientStorage.setAsync('changelog-frame', frameNode?.id)
        return true
      }
    }
  }
  const cvPage = figma.root.findOne((node) => node.name === 'changelog-dv')
  await figma.clientStorage.setAsync('changelog-frame', cvPage?.id)
  return !!cvPage
}

export default hasPage
