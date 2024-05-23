import dayjs from 'dayjs'
import createVersionFrame from '../functions/createVersionFrame'
import getLastVersion from '../functions/getLastVersion'

const saveVersion = async (version: string, message: string) => {
  try {
    const history = await figma.saveVersionHistoryAsync('v' + version, message)
    await figma.clientStorage.setAsync('version', version)
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

      const history = await saveVersion(version, message)

      if (!history) {
        return { error: 'Error saving the version' }
      }

      const getPreReleases = await getLastVersion()

      let description = message

      if (getPreReleases.lastVersion.includes('-rc') && !version.includes('-rc')) {
        const getPreReleaseFrames = figma.root.findAll(node => node.type === 'FRAME' && node.name.includes(getPreReleases.lastVersion.split('-rc')[0])) as FrameNode[]
        const getTextNodes = getPreReleaseFrames.map(frame => frame.findOne(node => node.type === 'TEXT' && node.name === 'description')) as TextNode[]
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
        return { error: 'Error creating the version frame' }
      }

      return { data: frame }
    } else {
      const date = dayjs().format('MMMM D, YYYY')

      const history = await saveVersion(date, message)

      if (!history) {
        return { error: 'Error saving the version' }
      }

      const frame = await createVersionFrame(
        date,
        message,
        links,
        date,
        'date'
      )

      if (!frame) {
        return { error: 'Error creating the version frame' }
      }

      return { data: frame }
    }
  } catch (error) {
    return { error }
  }
}
export default commit