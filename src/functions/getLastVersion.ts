// This function will get the last version of the changelog

import constants from '../constants'

export interface VersioningData {
  type: string
  lastVersion: string
}

export const getLastVersion = async (pageID: string): Promise<VersioningData> => {
  const lastVersion = '0.0.0'
  const page = await figma.getNodeByIdAsync(pageID) as PageNode

  if (!page) {
    return {
      type: '',
      lastVersion
    }
  }

  const changelogFrame = page.findOne(node => node.type === 'FRAME' && node.name === constants.CHANGELOG_FRAME_NAME) as FrameNode

  console.log('changelogFrame', changelogFrame)
  if (!changelogFrame) {
    return {
      type: '',
      lastVersion
    }
  }

  const heading = changelogFrame.findOne(cNode => cNode.type === 'TEXT' && cNode.name === constants.HEADING_NAME) as TextNode

  console.log('heading', heading)
  if (!heading) {
    return {
      type: '',
      lastVersion
    }
  }

  const type = heading ? heading.characters.startsWith('v') ? 'semantic' : 'date' : ''
  console.log('type', type)
  return {
    type,
    lastVersion: type === 'semantic' ? heading.characters.replace('v', '') : ''
  }
}
export default getLastVersion
