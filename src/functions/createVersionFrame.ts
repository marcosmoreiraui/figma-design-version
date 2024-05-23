import colors from '../functions/colors'

const getFonts = async () => {
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
}

const getUserBadge = async (name: string, image: string | null) => {
  try {
    return image && await figma.createImageAsync(image).then(async (image: Image) => {
      const userBadgeImage = figma.createFrame()
      userBadgeImage.name = 'user-image'
      userBadgeImage.resize(18, 18)
      userBadgeImage.cornerRadius = 20
      userBadgeImage.fills = [
        {
          type: 'IMAGE',
          imageHash: image.hash,
          scaleMode: 'FILL'
        }
      ]

      const userBadge = figma.createFrame()
      userBadge.name = 'user'
      userBadge.layoutGrow = 0
      userBadge.paddingLeft = 0
      userBadge.paddingRight = 0
      userBadge.paddingTop = 0
      userBadge.paddingBottom = 0
      userBadge.primaryAxisAlignItems = 'MIN'
      userBadge.counterAxisAlignItems = 'CENTER'
      userBadge.primaryAxisSizingMode = 'AUTO'
      userBadge.layoutMode = 'HORIZONTAL'
      userBadge.counterAxisSizingMode = 'AUTO'
      userBadge.verticalPadding = 4
      userBadge.itemSpacing = 4
      userBadge.overflowDirection = 'NONE'

      const userBadgeText = figma.createText()
      userBadgeText.name = 'user-name'
      userBadgeText.characters = `${name} on`
      userBadgeText.fontSize = 12
      userBadgeText.fontName = {
        family: 'Inter',
        style: 'Regular'
      }
      userBadgeText.fills = [
        {
          type: 'SOLID',
          visible: true,
          opacity: 1,
          blendMode: 'NORMAL',
          color: colors.textMuted
        }
      ]
      userBadge.insertChild(0, userBadgeImage)
      userBadge.insertChild(1, userBadgeText)
      return userBadge
    })
      .catch((error: any) => {
        console.log(error)
      })
  } catch (error) {
    console.log(error)
    figma.notify('Error getting user information')
    figma.closePlugin()
  }
}

const getLinks = async (links: Array<{ label?: string, url?: string }>) => {
  if (!links.length) return
  const frame = figma.createFrame()
  frame.resize(485.0000000000, 16.0000000000)
  frame.counterAxisSizingMode = 'AUTO'
  frame.name = 'Links'
  frame.relativeTransform = [[1, 0, 0], [0, 1, 110]]
  frame.y = 110
  frame.layoutAlign = 'STRETCH'
  frame.fills = [{
    type: 'SOLID',
    visible: true,
    opacity: 1,
    blendMode: 'NORMAL',
    color: {
      r: 1,
      g: 1,
      b: 1
    },
    boundVariables: {}
  }]
  frame.primaryAxisSizingMode = 'FIXED'
  frame.layoutMode = 'HORIZONTAL'
  frame.layoutWrap = 'WRAP'
  frame.strokeTopWeight = 1
  frame.strokeBottomWeight = 1
  frame.strokeLeftWeight = 1
  frame.strokeRightWeight = 1
  frame.counterAxisSizingMode = 'AUTO'
  frame.itemSpacing = 8
  frame.counterAxisSpacing = 8

  links.forEach((link, index) => {
    const text = figma.createText()
    frame.appendChild(text)
    text.resize(42.0000000000, 16.0000000000)
    text.name = 'Link'
    frame.layoutMode = 'HORIZONTAL'
    text.fills = [{
      type: 'SOLID',
      visible: true,
      opacity: 1,
      blendMode: 'NORMAL',
      color: colors.textMuted,
      boundVariables: {}
    }]
    text.autoRename = false
    text.hyperlink = {
      type: 'URL',
      value: link.url ?? ''
    }

    // Font properties
    text.fontName = {
      family: 'Inter',
      style: 'Regular'
    }
    text.characters = `${link.label} ↗`
    text.listSpacing = 0
    text.lineHeight = {
      unit: 'PIXELS',
      value: 12
    }
    text.fontName = {
      family: 'Inter',
      style: 'Regular'
    }
    text.textAutoResize = 'WIDTH_AND_HEIGHT'
  })
  return frame
}

const createVersionFrame = async (
  version: string,
  description: string,
  links: Array<{ label?: string, link?: string }>,
  date: string,
  versioningType: 'semantic' | 'date'
) => {
  try {
    await getFonts()
    const setLinks = await getLinks(links)

    const versionFrame = figma.createFrame()
    versionFrame.locked = true
    versionFrame.name = `version-[${version}]`
    versionFrame.layoutAlign = 'STRETCH'
    versionFrame.paddingTop = 0
    versionFrame.paddingBottom = 0
    versionFrame.paddingLeft = 16
    versionFrame.paddingRight = 16
    versionFrame.layoutMode = 'HORIZONTAL'
    versionFrame.layoutGrow = 0
    versionFrame.primaryAxisAlignItems = 'MIN'
    versionFrame.counterAxisAlignItems = 'MIN'
    versionFrame.primaryAxisSizingMode = 'FIXED'
    versionFrame.layoutPositioning = 'AUTO'
    versionFrame.counterAxisSizingMode = 'AUTO'
    versionFrame.clipsContent = false
    versionFrame.fills = [
      {
        type: 'SOLID',
        visible: true,
        opacity: 0,
        blendMode: 'NORMAL',
        color: colors.background
      }
    ]

    const versionLines = figma.createFrame()
    versionLines.name = 'lines'
    versionLines.layoutAlign = 'STRETCH'
    versionLines.primaryAxisSizingMode = 'AUTO'
    versionLines.horizontalPadding = 16
    versionLines.verticalPadding = 0
    versionLines.layoutMode = 'VERTICAL'
    versionLines.primaryAxisAlignItems = 'MIN'
    versionLines.counterAxisAlignItems = 'MIN'
    versionLines.counterAxisSizingMode = 'FIXED'
    versionLines.clipsContent = false
    versionLines.fills = [
      {
        type: 'SOLID',
        visible: true,
        opacity: 0,
        blendMode: 'NORMAL',
        color: colors.background
      }
    ]

    const versionLine = figma.createRectangle()
    versionLine.name = 'Line'
    versionLine.resize(1, 100)
    versionLine.rotation = 0
    versionLine.layoutAlign = 'STRETCH'
    versionLine.constrainProportions = false
    versionLine.layoutGrow = 0
    versionLines.layoutMode = 'HORIZONTAL'
    versionLine.fills = [
      {
        type: 'SOLID',
        visible: true,
        opacity: 1,
        blendMode: 'NORMAL',
        color: colors.border
      }
    ]

    const versionCircle = figma.createEllipse()
    versionCircle.name = 'circle'
    versionCircle.resize(9, 9)
    versionCircle.layoutAlign = 'INHERIT'
    versionCircle.constrainProportions = true
    versionCircle.layoutGrow = 0
    versionCircle.fills = [
      {
        type: 'SOLID',
        visible: true,
        opacity: 1,
        blendMode: 'NORMAL',
        color: colors.border
      }
    ]

    const versionMain = figma.createFrame()
    versionMain.name = 'main'
    versionMain.constrainProportions = false
    versionMain.layoutGrow = 1
    versionMain.layoutPositioning = 'AUTO'
    versionMain.primaryAxisAlignItems = 'MIN'
    versionMain.counterAxisAlignItems = 'MIN'
    versionMain.primaryAxisSizingMode = 'AUTO'
    versionMain.layoutMode = 'VERTICAL'
    versionMain.layoutPositioning = 'AUTO'
    versionMain.counterAxisSizingMode = 'FIXED'
    versionMain.paddingTop = 16
    versionMain.paddingBottom = 16
    versionMain.paddingLeft = 0
    versionMain.paddingRight = 0
    versionMain.itemSpacing = 8

    const versionTitle = figma.createFrame()
    versionTitle.name = 'title'
    versionTitle.layoutAlign = 'STRETCH'
    versionTitle.layoutGrow = 0
    versionTitle.paddingLeft = 0
    versionTitle.paddingRight = 0
    versionTitle.paddingTop = 0
    versionTitle.paddingBottom = 0
    versionTitle.primaryAxisAlignItems = 'MIN'
    versionTitle.counterAxisAlignItems = 'CENTER'
    versionTitle.primaryAxisSizingMode = 'AUTO'
    versionTitle.layoutMode = 'VERTICAL'
    versionTitle.counterAxisSizingMode = 'AUTO'
    versionTitle.itemSpacing = 4

    const versionTextGroup = figma.createFrame()
    versionTextGroup.name = 'text'
    versionTextGroup.layoutAlign = 'INHERIT'
    versionTextGroup.layoutGrow = 0
    versionTextGroup.primaryAxisAlignItems = 'MIN'
    versionTextGroup.counterAxisAlignItems = 'CENTER'
    versionTextGroup.primaryAxisSizingMode = 'FIXED'
    versionTextGroup.layoutMode = 'HORIZONTAL'
    versionTextGroup.counterAxisSizingMode = 'AUTO'
    versionTextGroup.itemSpacing = 4
    versionTextGroup.layoutAlign = 'STRETCH'

    const versionText = figma.createText()
    versionText.name = 'heading'
    versionText.fontSize = 16
    versionText.fontName = {
      family: 'Inter',
      style: 'Semi Bold'
    }
    versionText.fills = [
      {
        type: 'SOLID',
        visible: true,
        opacity: 1,
        blendMode: 'NORMAL',
        color: colors.textDefault
      }
    ]
    versionText.letterSpacing = {
      unit: 'PERCENT',
      value: -2
    }
    versionText.lineHeight = {
      unit: 'PIXELS',
      value: 16
    }
    versionText.characters = version
    versionText.textAlignHorizontal = 'LEFT'
    versionText.textAlignVertical = 'CENTER'
    versionText.layoutAlign = 'STRETCH'

    const versionDateText = figma.createText()
    versionDateText.fontSize = 12
    versionDateText.fontName = {
      family: 'Inter',
      style: 'Semi Bold'
    }
    versionDateText.fills = [
      {
        type: 'SOLID',
        visible: true,
        opacity: 1,
        blendMode: 'NORMAL',
        color: colors.textMuted
      }
    ]
    versionDateText.lineHeight = {
      unit: 'PIXELS',
      value: 16
    }
    versionDateText.name = 'date'
    versionDateText.characters = date
    versionDateText.fontSize = 12
    versionDateText.fontName = {
      family: 'Inter',
      style: 'Regular'
    }
    versionDateText.fills = [
      {
        type: 'SOLID',
        visible: true,
        opacity: 1,
        blendMode: 'NORMAL',
        color: colors.textMuted
      }
    ]
    versionDateText.textCase = 'ORIGINAL'
    versionDateText.textDecoration = 'NONE'
    versionDateText.textAlignHorizontal = 'LEFT'
    versionDateText.textAlignVertical = 'CENTER'
    versionDateText.textAutoResize = 'WIDTH_AND_HEIGHT'

    // const restoreButtonText = figma.createText();
    // restoreButtonText.name = "restore";
    // restoreButtonText.fontSize = 12;
    // restoreButtonText.fontName = {
    //   family: "Inter",
    //   style: "Semi Bold",
    // };
    // restoreButtonText.fills = [
    //   {
    //     type: "SOLID",
    //     visible: true,
    //     opacity: 1,
    //     blendMode: "NORMAL",
    //     color: {
    //       r: 1,
    //       g: 1,
    //       b: 1,
    //     },
    //   },
    // ];
    // restoreButtonText.lineHeight = {
    //   unit: "PIXELS",
    //   value: 16,
    // };
    // restoreButtonText.characters = "Restore";
    // restoreButtonText.fontSize = 12;
    // restoreButtonText.textCase = "ORIGINAL";
    // restoreButtonText.textDecoration = "NONE";
    // restoreButtonText.textAlignHorizontal = "LEFT";
    // restoreButtonText.textAlignVertical = "CENTER";
    // restoreButtonText.textAutoResize = "WIDTH_AND_HEIGHT";
    // restoreButtonText.layoutAlign = "INHERIT";
    // restoreButtonText.layoutGrow = 0;
    // restoreButtonText.hyperlink = {
    //   type: "URL",
    //   value: createHistoryLink(historyId),
    // };
    //
    // const restoreButton = figma.createFrame();
    // restoreButton.name = "restore";
    // restoreButton.layoutAlign = "INHERIT";
    // restoreButton.layoutGrow = 0;
    // restoreButton.primaryAxisAlignItems = "MIN";
    // restoreButton.counterAxisAlignItems = "MIN";
    // restoreButton.primaryAxisSizingMode = "AUTO";
    // restoreButton.layoutMode = "HORIZONTAL";
    // restoreButton.counterAxisSizingMode = "AUTO";
    // restoreButton.itemSpacing = 4;
    // restoreButton.overflowDirection = "NONE";
    // restoreButton.cornerRadius = 4;
    // restoreButton.fills = [
    //   {
    //     type: "SOLID",
    //     visible: true,
    //     opacity: 1,
    //     blendMode: "NORMAL",
    //     color: {
    //       r: 0.9490196108818054,
    //       g: 0.9490196108818054,
    //       b: 0.9490196108818054,
    //     },
    //   },
    // ];
    // restoreButton.verticalPadding = 8;
    // restoreButton.horizontalPadding = 16;

    const versionDescription = figma.createFrame()
    versionDescription.name = 'description'
    versionDescription.layoutAlign = 'STRETCH'
    versionDescription.paddingLeft = 0
    versionDescription.paddingRight = 0
    versionDescription.paddingTop = 0
    versionDescription.paddingBottom = 0
    versionDescription.primaryAxisAlignItems = 'MIN'
    versionDescription.counterAxisAlignItems = 'MIN'
    versionDescription.primaryAxisSizingMode = 'AUTO'
    versionDescription.layoutMode = 'VERTICAL'
    versionDescription.counterAxisSizingMode = 'FIXED'
    versionDescription.verticalPadding = 0
    versionDescription.layoutAlign = 'STRETCH'
    versionDescription.layoutGrow = 0
    versionDescription.layoutPositioning = 'AUTO'

    const versionDescriptionText = figma.createText()
    versionDescriptionText.fontName = {
      family: 'Inter',
      style: 'Regular'
    }
    versionDescriptionText.fontSize = 12
    versionDescriptionText.lineHeight = {
      unit: 'PIXELS',
      value: 16
    }
    versionDescriptionText.fills = [
      {
        type: 'SOLID',
        visible: true,
        opacity: 1,
        blendMode: 'NORMAL',
        color: colors.textDefault
      }
    ]
    versionDescriptionText.lineHeight = {
      unit: 'PIXELS',
      value: 16
    }
    versionDescriptionText.name = 'description'
    versionDescriptionText.characters = description
    versionDescriptionText.fontSize = 12
    versionDescriptionText.textCase = 'ORIGINAL'
    versionDescriptionText.textDecoration = 'NONE'
    versionDescriptionText.textAlignHorizontal = 'LEFT'
    versionDescriptionText.textAlignVertical = 'CENTER'
    versionDescriptionText.textAutoResize = 'WIDTH_AND_HEIGHT'
    versionDescriptionText.layoutGrow = 0
    versionDescriptionText.layoutAlign = 'STRETCH'

    // restoreButton.insertChild(0, restoreButtonText);
    // versionTitle.insertChild(1, restoreButton);

    const user = figma.currentUser ?? {
      name: 'Unknown',
      photoUrl: ''
    }
    const badge = await getUserBadge(user.name, user.photoUrl)

    badge && versionTextGroup.insertChild(0, badge)
    versionTextGroup.insertChild(1, versionDateText)

    versionTitle.insertChild(0, versionText)
    versionTitle.insertChild(1, versionTextGroup)

    versionDescription.insertChild(0, versionDescriptionText)

    versionLines.insertChild(0, versionLine)
    versionLines.insertChild(1, versionCircle)

    versionMain.insertChild(0, versionTitle)
    versionMain.insertChild(1, versionDescription)
    setLinks && versionMain.insertChild(2, setLinks)

    versionFrame.insertChild(0, versionLines)
    versionFrame.insertChild(1, versionMain)

    versionCircle.layoutPositioning = 'ABSOLUTE'
    versionCircle.x = 12
    versionCircle.y = 20

    versionLine.layoutPositioning = 'ABSOLUTE'
    versionLine.y = 21

    return versionFrame
  } catch (e) {
    console.log(e)
    figma.notify('Error creating version frame')
    figma.closePlugin()
  }
}

export default createVersionFrame
