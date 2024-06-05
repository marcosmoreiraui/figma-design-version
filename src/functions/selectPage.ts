import createChangelogCard from '../functions/createChangelogCard'
import setClientStorage from "../functions/setClientStorage";

const selectPage = async (id: string) => {
  try {
    await setClientStorage('page', id)

    if (figma.root.findOne(node => node.id === id && node.type === 'PAGE')) {
      const frame = figma.root.findOne(node => node.type === 'FRAME' && node.name === 'changelog-dv')
      if (!frame) {
        const page = figma.getNodeById(id) as PageNode
        const emptyFrame = await createChangelogCard()
        page.insertChild(0, emptyFrame)
      }
    }

    return id
  } catch (error) {
    figma.notify(String(error))
    figma.closePlugin()
  }
}
export default selectPage
