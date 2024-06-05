import constants from "../constants";

async function getClientStorage(key: string): Promise<any> {
  const documentName = figma.root.name;

  const storageKey = `${constants.PLUGIN_TAG}-${documentName}-${key}`;

  return await figma.clientStorage.getAsync(storageKey);
}

export default getClientStorage;
