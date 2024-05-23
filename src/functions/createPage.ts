import createChangelogCard from './createChangelogCard'

const createPage = async (name: string) => {
  try {
    await figma.clientStorage.setAsync('fileId', figma.root.id)
    const card = await createChangelogCard()
    const page = figma.createPage()
    page.name = name
    page.insertChild(0, card)
    figma.root.insertChild(0, page)
    figma.viewport.scrollAndZoomIntoView([card])
    await figma.clientStorage.setAsync('page', page.id)
  } catch (error) {
    figma.notify(String(error))
    figma.closePlugin()
  }
}
export default createPage
