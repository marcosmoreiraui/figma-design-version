import getClientStorage from "../functions/getClientStorage";

async function getPage () {
  const pageID: string = await getClientStorage('page')
  if (pageID) {
    const isPresent = figma.getNodeById(pageID)
    if (isPresent) {
      return pageID
    }
  }
  return undefined
}

export default getPage
