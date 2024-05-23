export const getVersionType = async () => {
  const type = await figma.clientStorage.getAsync('versioning')
  if (type) return type

  const changelogFrame = figma.root.findOne(node => node.type === 'FRAME' && node.name === 'changelog-dv') as FrameNode
  if (!changelogFrame) return null

  const versionFrame = changelogFrame?.findOne((node: {
    type: string
    name: string
  }) => node.type === 'FRAME' && node.name.startsWith('version')) as FrameNode
  if (!versionFrame) return null

  const headingNode: TextNode = versionFrame.findOne((node: {
    type: string
    name: string
  }) => node.type === 'TEXT' && node.name === 'heading') as TextNode
  if (!headingNode) return null

  return headingNode.characters.startsWith('v') ? 'semantic' : 'date'
}

const getLastVersion = async () => {
  const type = await getVersionType()
  let lastVersion = ''
  if (type === 'semantic') {
    const changelogFrame = figma.root.findOne(node => node.type === 'FRAME' && node.name === 'changelog-dv') as FrameNode
    if (!changelogFrame) lastVersion = ''

    const versionFrame = changelogFrame?.findOne((node: {
      type: string
      name: string
    }) => node.type === 'FRAME' && node.name.includes('version')) as FrameNode
    if (!versionFrame) lastVersion = ''

    const headingNode: TextNode = versionFrame.findOne((node: {
      type: string
      name: string
    }) => node.type === 'TEXT' && node.name === 'heading') as TextNode
    if (!headingNode) lastVersion = ''

    lastVersion = headingNode.characters.replace('v', '')
  }
  return {
    type,
    lastVersion
  }
}

export default getLastVersion
