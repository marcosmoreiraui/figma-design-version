import createEmptyState from './createEmptyState'
import colors from './colors'

const createChangelogCard = async () => {
  // await figma.clientStorage.deleteAsync("version");
  // await figma.clientStorage.deleteAsync("changelog");

  await figma.loadFontAsync({
    family: 'Inter',
    style: 'Semi Bold'
  })
  await figma.loadFontAsync({
    family: 'Inter',
    style: 'Regular'
  })
  await figma.loadFontAsync({
    family: 'Inter',
    style: 'Medium'
  })

  const emptyState = await createEmptyState()

  // Header Props
  const mainHeader = figma.createFrame()
  mainHeader.locked = true
  mainHeader.name = 'header'
  mainHeader.layoutAlign = 'STRETCH'
  mainHeader.layoutGrow = 0
  mainHeader.strokeAlign = 'INSIDE'
  mainHeader.strokeJoin = 'MITER'
  mainHeader.strokeMiterLimit = 4
  mainHeader.topLeftRadius = 4
  mainHeader.topRightRadius = 4
  mainHeader.bottomLeftRadius = 0
  mainHeader.bottomRightRadius = 0
  mainHeader.paddingLeft = 31
  mainHeader.paddingRight = 16
  mainHeader.paddingTop = 40
  mainHeader.paddingBottom = 40
  mainHeader.primaryAxisAlignItems = 'MIN'
  mainHeader.counterAxisAlignItems = 'CENTER'
  mainHeader.primaryAxisSizingMode = 'FIXED'
  mainHeader.strokeTopWeight = 0
  mainHeader.strokeBottomWeight = 1
  mainHeader.strokeLeftWeight = 0
  mainHeader.strokeRightWeight = 0
  mainHeader.layoutMode = 'HORIZONTAL'
  mainHeader.counterAxisSizingMode = 'AUTO'

  // Header Title
  const mainTitle = figma.createText()
  mainTitle.characters = 'Changelog'
  mainTitle.name = 'title'
  mainTitle.fontName = {
    family: 'Inter',
    style: 'Semi Bold'
  }
  mainTitle.lineHeight = {
    unit: 'PIXELS',
    value: 0
  }
  mainTitle.textAlignHorizontal = 'LEFT'
  mainTitle.textAlignVertical = 'CENTER'
  mainTitle.textAutoResize = 'WIDTH_AND_HEIGHT'
  mainTitle.fontSize = 24
  mainTitle.fills = [
    {
      type: 'SOLID',
      visible: true,
      blendMode: 'NORMAL',
      color: colors.textDefault
    }
  ]

  const main = figma.createFrame()
  main.resize(550, 600)
  main.locked = true
  main.name = 'changelog-dv'
  main.fills = [
    {
      type: 'SOLID',
      visible: true,
      opacity: 1,
      blendMode: 'NORMAL',
      color: colors.background
    }
  ]
  main.effects = [
    {
      type: 'DROP_SHADOW',
      color: {
        r: 0,
        g: 0,
        b: 0,
        a: 0.10000000149011612
      },
      offset: {
        x: 0,
        y: 12
      },
      radius: 24,
      spread: 0,
      visible: true,
      blendMode: 'NORMAL',
      showShadowBehindNode: false
    }
  ]
  main.strokes = [
    {
      type: 'SOLID',
      visible: true,
      opacity: 1,
      blendMode: 'NORMAL',
      color: colors.border
    }
  ]
  main.layoutGrow = 0
  main.strokeWeight = 1
  main.strokeAlign = 'INSIDE'
  main.strokeJoin = 'MITER'
  main.topLeftRadius = 4
  main.topRightRadius = 4
  main.bottomLeftRadius = 8
  main.bottomRightRadius = 8
  main.primaryAxisAlignItems = 'MIN'
  main.counterAxisAlignItems = 'MIN'
  main.primaryAxisSizingMode = 'AUTO'
  main.layoutMode = 'VERTICAL'
  main.counterAxisSizingMode = 'FIXED'

  const footer = figma.createFrame()
  footer.locked = true
  footer.name = 'footer'
  footer.layoutAlign = 'STRETCH'
  footer.layoutGrow = 0
  footer.layoutPositioning = 'AUTO'
  footer.bottomLeftRadius = 8
  footer.bottomRightRadius = 8
  footer.paddingLeft = 31
  footer.paddingRight = 16
  footer.paddingTop = 32
  footer.paddingBottom = 18
  footer.primaryAxisAlignItems = 'MIN'
  footer.counterAxisAlignItems = 'CENTER'
  footer.primaryAxisSizingMode = 'FIXED'
  footer.layoutMode = 'HORIZONTAL'
  footer.counterAxisSizingMode = 'AUTO'
  footer.verticalPadding = 18
  footer.itemSpacing = 8

  const footerText = figma.createText()
  footerText.name = 'footerText'
  footerText.characters = 'Made with Design version'
  footerText.textAlignHorizontal = 'LEFT'
  footerText.textAlignVertical = 'CENTER'
  footerText.textAutoResize = 'WIDTH_AND_HEIGHT'
  footerText.fontSize = 10
  footerText.fills = [
    {
      type: 'SOLID',
      visible: true,
      blendMode: 'NORMAL',
      color: colors.textMuted
    }
  ]

  mainHeader.insertChild(0, mainTitle)
  footer.insertChild(0, footerText)

  main.insertChild(0, mainHeader)
  main.insertChild(1, emptyState)
  main.insertChild(2, footer)

  await figma.clientStorage.setAsync('changelog', main.id)

  return main
}

export default createChangelogCard
