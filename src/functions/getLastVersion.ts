// This function will get the last version of the changelog

import constants from '../constants'

export interface VersioningData {
  type: string
  lastVersion: string
}

export const getLastVersion = async (pageID: string): Promise<VersioningData> => {
  const lastVersion = ''
  const page = figma.getNodeById(pageID) as PageNode

  const changelogFrame = page.findOne(node => node.type === 'FRAME' && node.name === constants.CHANGELOG_FRAME_NAME) as FrameNode

  if (!changelogFrame) {
    return {
      type: '',
      lastVersion
    }
  }

  const heading = changelogFrame.findOne(cNode => cNode.type === 'TEXT' && cNode.name === constants.HEADING_NAME) as TextNode

  if (!heading) {
    return {
      type: '',
      lastVersion
    }
  }

  const type = heading ? heading.characters.startsWith('v') ? 'semantic' : 'date' : ''
  return {
    type,
    lastVersion: type === 'semantic' ? heading.characters.replace('v', '') : ''
  }
}
export default getLastVersion
