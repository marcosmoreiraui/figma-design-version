function semanticVersioning (version: string, type: string, isRc: boolean): string {
  let versionArr: string[] = version.split('.')
  let result: string

  switch (type) {
    case '2': // 'minor'
      versionArr[1] = (parseInt(versionArr[1]) + 1).toString()
      versionArr[2] = '0'
      break
    case '3': // 'major'
      versionArr[0] = (parseInt(versionArr[0]) + 1).toString()
      versionArr[1] = '0'
      versionArr[2] = '0'
      break
    case '1': // 'patch'
      versionArr[2] = (parseInt(versionArr[2]) + 1).toString()
      break
    case 'xrc': // Elimina 'rc'
      if (version.includes('rc')) {
        const versionComponents = version.split('-rc')
        versionArr = versionComponents[0].split('.')
      }
      result = versionArr.join('.')
      return result
    default:
      break
  }

  if (isRc) {
    if (version.includes('rc')) {
      const versionComponents = version.split('-rc.')
      versionArr = versionComponents[0].split('.')
      const rcNumber = parseInt(versionComponents[1])
      result = `${versionArr.join('.')}-rc.${isNaN(rcNumber) ? 1 : rcNumber + 1}`
    } else {
      result = `${versionArr.join('.')}-rc.1`
    }
  } else if (!isRc && version.includes('rc')) {
    const versionComponents = version.split('-rc')
    versionArr = versionComponents[0].split('.')
    result = `${versionArr.join('.')}`
  } else {
    result = versionArr.join('.')
  }

  return result
}

export default semanticVersioning
