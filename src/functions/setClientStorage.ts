import constants from "../constants";

async function setClientStorage(key: string, value: string): Promise<any> {
  const documentName = figma.root.name;

  const storageKey = `${constants.PLUGIN_TAG}-${documentName}-${key}`;

  return await figma.clientStorage.setAsync(storageKey, value);
}

export default setClientStorage;
