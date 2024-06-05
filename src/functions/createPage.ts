import createChangelogCard from './createChangelogCard'

const createPage = async (name: string) => {
  try {
    const card = await createChangelogCard()
    const page = figma.createPage()
    page.name = name
    page.insertChild(0, card)
    figma.root.insertChild(0, page)
    figma.viewport.scrollAndZoomIntoView([card])
  } catch (error) {
    figma.notify(String(error))
    figma.closePlugin()
  }
}
export default createPage
