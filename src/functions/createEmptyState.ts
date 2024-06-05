const createEmptyState = async () => {
  const frame = figma.createFrame()
  frame.resize(550.0, 263.0)
  frame.locked = true
  frame.primaryAxisSizingMode = 'AUTO'
  frame.name = 'empty-state'
  frame.relativeTransform = [
    [1, 0, 0],
    [0, 1, 80]
  ]
  frame.y = 80
  frame.fills = []
  frame.paddingLeft = 16
  frame.paddingRight = 16
  frame.paddingTop = 40
  frame.paddingBottom = 40
  frame.counterAxisAlignItems = 'CENTER'
  frame.strokeTopWeight = 1
  frame.strokeBottomWeight = 1
  frame.strokeLeftWeight = 1
  frame.strokeRightWeight = 1
  frame.backgrounds = []
  frame.layoutMode = 'VERTICAL'
  frame.itemSpacing = 24

  // Create RECTANGLE
  const rectangle = figma.createRectangle()
  frame.appendChild(rectangle)
  rectangle.name = 'image'
  rectangle.fills = [
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
  rectangle.relativeTransform = [
    [1, 0, 225],
    [0, 1, 40]
  ]
  rectangle.x = 225
  rectangle.y = 40
  rectangle.cornerRadius = 12
  rectangle.strokeTopWeight = 1
  rectangle.strokeBottomWeight = 1
  rectangle.strokeLeftWeight = 1
  rectangle.strokeRightWeight = 1

  // Create FRAME
  const frame2 = figma.createFrame()
  frame.appendChild(frame2)
  frame2.resize(518.0, 59.0)
  frame2.primaryAxisSizingMode = 'AUTO'
  frame2.name = 'texts'
  frame2.relativeTransform = [
    [1, 0, 16],
    [0, 1, 164]
  ]
  frame2.x = 16
  frame2.y = 164
  frame2.layoutAlign = 'STRETCH'
  frame2.fills = []
  frame2.counterAxisAlignItems = 'CENTER'
  frame2.strokeTopWeight = 1
  frame2.strokeBottomWeight = 1
  frame2.strokeLeftWeight = 1
  frame2.strokeRightWeight = 1
  frame2.backgrounds = []
  frame2.clipsContent = false
  frame2.layoutMode = 'VERTICAL'
  frame2.itemSpacing = 8

  // Create TEXT
  const text = figma.createText()
  frame2.appendChild(text)
  text.resize(163.0, 19.0)
  text.name = 'Create a new version'
  // Font properties
  text.fontName = {
    family: 'Inter',
    style: 'Semi Bold'
  }
  text.characters = 'Create a new version'
  text.fontSize = 16
  text.fontName = {
    family: 'Inter',
    style: 'Semi Bold'
  }
  text.textAutoResize = 'HEIGHT'

  // Create TEXT
  const text2 = figma.createText()
  frame2.appendChild(text2)
  text2.name = 'description'
  text2.fills = [
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
  text2.relativeTransform = [
    [1, 0, 0],
    [0, 1, 27]
  ]
  text2.y = 27
  text2.layoutAlign = 'STRETCH'
  text2.autoRename = false

  // Font properties
  text2.fontName = {
    family: 'Inter',
    style: 'Regular'
  }
  text2.textAlignHorizontal = 'CENTER'
  text2.characters =
        'Work on your design and when it is ready, generate a new version by opening the plugin again. All versions will be saved in the history so you can always access them.'
  text2.lineHeight = {
    unit: 'PIXELS',
    value: 16
  }
  text2.fontName = {
    family: 'Inter',
    style: 'Regular'
  }
  text2.textAutoResize = 'HEIGHT'
  text2.resize(360, 48.0)

  return frame
}
export default createEmptyState
