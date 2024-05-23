const createEmptyState = async () => {
  const frame_1_14 = figma.createFrame()
  frame_1_14.resize(550.0, 263.0)
  frame_1_14.locked = true
  frame_1_14.primaryAxisSizingMode = 'AUTO'
  frame_1_14.name = 'empty-state'
  frame_1_14.relativeTransform = [
    [1, 0, 0],
    [0, 1, 80]
  ]
  frame_1_14.y = 80
  frame_1_14.fills = []
  frame_1_14.paddingLeft = 16
  frame_1_14.paddingRight = 16
  frame_1_14.paddingTop = 40
  frame_1_14.paddingBottom = 40
  frame_1_14.counterAxisAlignItems = 'CENTER'
  frame_1_14.strokeTopWeight = 1
  frame_1_14.strokeBottomWeight = 1
  frame_1_14.strokeLeftWeight = 1
  frame_1_14.strokeRightWeight = 1
  frame_1_14.backgrounds = []
  frame_1_14.layoutMode = 'VERTICAL'
  frame_1_14.itemSpacing = 24

  // Create RECTANGLE
  const rectangle_1_18 = figma.createRectangle()
  frame_1_14.appendChild(rectangle_1_18)
  rectangle_1_18.name = 'image'
  rectangle_1_18.fills = [
    {
      type: 'SOLID',
      visible: true,
      opacity: 1,
      blendMode: 'NORMAL',
      color: {
        r: 0.8509804010391235,
        g: 0.8509804010391235,
        b: 0.8509804010391235
      }
    }
  ]
  rectangle_1_18.relativeTransform = [
    [1, 0, 225],
    [0, 1, 40]
  ]
  rectangle_1_18.x = 225
  rectangle_1_18.y = 40
  rectangle_1_18.cornerRadius = 12
  rectangle_1_18.strokeTopWeight = 1
  rectangle_1_18.strokeBottomWeight = 1
  rectangle_1_18.strokeLeftWeight = 1
  rectangle_1_18.strokeRightWeight = 1

  // Create FRAME
  const frame_1_19 = figma.createFrame()
  frame_1_14.appendChild(frame_1_19)
  frame_1_19.resize(518.0, 59.0)
  frame_1_19.primaryAxisSizingMode = 'AUTO'
  frame_1_19.name = 'texts'
  frame_1_19.relativeTransform = [
    [1, 0, 16],
    [0, 1, 164]
  ]
  frame_1_19.x = 16
  frame_1_19.y = 164
  frame_1_19.layoutAlign = 'STRETCH'
  frame_1_19.fills = []
  frame_1_19.counterAxisAlignItems = 'CENTER'
  frame_1_19.strokeTopWeight = 1
  frame_1_19.strokeBottomWeight = 1
  frame_1_19.strokeLeftWeight = 1
  frame_1_19.strokeRightWeight = 1
  frame_1_19.backgrounds = []
  frame_1_19.clipsContent = false
  frame_1_19.layoutMode = 'VERTICAL'
  frame_1_19.itemSpacing = 8

  // Create TEXT
  const text_1_15 = figma.createText()
  frame_1_19.appendChild(text_1_15)
  text_1_15.resize(163.0, 19.0)
  text_1_15.name = 'Create a new version'
  // Font properties
  text_1_15.fontName = {
    family: 'Inter',
    style: 'Semi Bold'
  }
  text_1_15.characters = 'Create a new version'
  text_1_15.fontSize = 16
  text_1_15.fontName = {
    family: 'Inter',
    style: 'Semi Bold'
  }
  text_1_15.textAutoResize = 'HEIGHT'

  // Create TEXT
  const text_1_17 = figma.createText()
  frame_1_19.appendChild(text_1_17)
  text_1_17.name = 'description'
  text_1_17.fills = [
    {
      type: 'SOLID',
      visible: true,
      opacity: 1,
      blendMode: 'NORMAL',
      color: {
        r: 0.05098039284348488,
        g: 0.10196078568696976,
        b: 0.20000000298023224
      }
    }
  ]
  text_1_17.relativeTransform = [
    [1, 0, 0],
    [0, 1, 27]
  ]
  text_1_17.y = 27
  text_1_17.layoutAlign = 'STRETCH'
  text_1_17.autoRename = false

  // Font properties
  text_1_17.fontName = {
    family: 'Inter',
    style: 'Regular'
  }
  text_1_17.textAlignHorizontal = 'CENTER'
  text_1_17.characters =
        'Work on your design and when it is ready, generate a new version by opening the plugin again. All versions will be saved in the history so you can always access them.'
  text_1_17.lineHeight = {
    unit: 'PIXELS',
    value: 16
  }
  text_1_17.fontName = {
    family: 'Inter',
    style: 'Regular'
  }
  text_1_17.textAutoResize = 'HEIGHT'
  text_1_17.resize(360, 48.0)

  return frame_1_14
}
export default createEmptyState
