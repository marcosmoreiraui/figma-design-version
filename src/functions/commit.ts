import dayjs from 'dayjs'
import createVersionFrame from '../functions/createVersionFrame'
import getLastVersion from '../functions/getLastVersion'
import getPage from '../functions/getPage'
import constants from '../constants';
import setClientStorage from "../functions/setClientStorage";

const saveVersion = async (version: string, message: string, type: 'semantic' | 'date') => {
  try {
    const history = await figma.saveVersionHistoryAsync(type === 'semantic' ? 'v' : '' + version, message)
    await setClientStorage('version', version);
    return history.id
  } catch (error) {
    console.log(error)
    figma.notify('Error saving the version')
    figma.closePlugin()
  }
}

const commit = async (versioning: 'semantic' | 'date', message: string, links: Array<{
  label: string
  url: string
}>, version: string) => {
  try {
    if (versioning === 'semantic') {
      const date = dayjs().format('MMMM D, YYYY h:mm A')
      const pageID = await getPage() ?? ''

      const history = await saveVersion(version, message, 'semantic')

      if (!history) {
        return {error: 'Error saving the version'}
      }

      const getPreReleases = await getLastVersion(pageID)

      let description = message

      if (getPreReleases.lastVersion.includes('-rc') && !version.includes(constants.RC)) {
        const getPreReleaseFrames = figma.root.findAll(node => node.type === 'FRAME' && node.name.includes(getPreReleases.lastVersion.split(constants.RC)[0])) as FrameNode[]
        const getTextNodes = getPreReleaseFrames.map(frame => frame.findOne(node => node.type === 'TEXT' && node.name === constants.DESCRIPTION_NAME)) as TextNode[]
        description = message + '\n' + getTextNodes.map(textNode => textNode.characters).join('\n')
      }

      const frame = await createVersionFrame(
        'v' + version,
        description,
        links,
        date,
        'semantic'
      )

      if (!frame) {
        return {error: 'Error creating the version frame'}
      }

      return {data: frame}
    } else {
      const date = dayjs().format('MMMM D, YYYY')

      const history = await saveVersion(date, message, 'date')

      if (!history) {
        return {error: 'Error saving the version'}
      }

      const frame = await createVersionFrame(
        date,
        message,
        links,
        date,
        'date'
      )

      if (!frame) {
        return {error: 'Error creating the version frame'}
      }

      return {data: frame}
    }
  } catch (error) {
    return {error}
  }
}
export default commit
