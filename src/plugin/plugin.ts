import getLastVersion from '../functions/getLastVersion'
import commit from '../functions/commit'
import getPage from '../functions/getPage'
import selectPage from '../functions/selectPage'
import createChangelogCard from '../functions/createChangelogCard'
import constants from '../constants'

function bootstrap () {
  figma.showUI(__html__, {
    themeColors: true,
    width: 350,
    height: 400,
    title: 'Design version'
  })
  figma.ui.onmessage = async (message) => {
    try {
      switch (message.type) {
        case 'INITIALIZE':
          await handleInitialize()
          break
        case 'SELECT_PAGE':
          await handleSelectPage(message)
          break
        case 'HAS_PAGE':
          await handleHasPage()
          break
        case 'VERSIONING':
          await handleVersioning()
          break
        case 'ERROR':
          handleErrorMessage(message)
          break
        case 'COMMIT':
          await handleCommitMessage(message)
          break
        default:
          throw new Error('Unrecognized message type')
      }
    } catch (error: unknown) {
      figma.notify('We had an error. Please try again.')
      figma.closePlugin()
    }
  }
}

bootstrap()

async function handleInitialize () {
  try {
    const pageID = await getPage() ?? ''
    if (!pageID) {
      const pagesIDS = figma.root.children.filter((node) => node.type === 'PAGE')
      const pages = pagesIDS.map((page) => ({
        id: page.id,
        name: figma.getNodeById(page.id)?.name
      }))
      figma.ui.postMessage({
        type: 'INITIALIZE',
        content:
          {
            hasPage: '',
            pages
          }
      })
      return
    }
    const versioning = await getLastVersion(pageID)
    figma.ui.postMessage({
      type: 'INITIALIZE',
      content: {
        hasPage: pageID,
        versioning
      }
    })
  } catch (error) {
    console.log(error)
    figma.ui.postMessage({
      type: 'ERROR',
      content: 'Error initializing the plugin.'
    })
  }
}

async function handleSelectPage (message: { content: string }) {
  try {
    await selectPage(message.content)
    figma.ui.postMessage({
      type: 'SELECT_PAGE',
      content: 'success'
    })
  } catch (error) {
    figma.ui.postMessage({
      type: 'SELECT_PAGE',
      content: 'Error creating the changelog page.'
    })
  }
}

async function handleHasPage () {
  try {
    const bol = await getPage()
    figma.ui.postMessage({
      type: 'HAS_PAGE',
      content: String(bol)
    })
  } catch (error) {
    figma.ui.postMessage({
      type: 'HAS_PAGE',
      content: 'Error loading the changelog page.'
    })
  }
}

async function handleVersioning () {
  try {
    const pageID = await getPage() ?? ''
    const versioning = await getLastVersion(pageID)
    figma.ui.postMessage({
      type: 'VERSIONING',
      content: versioning
    })
  } catch (error) {
    figma.ui.postMessage({
      type: 'VERSIONING',
      content: 'Error creating the version.'
    })
  }
}

function handleErrorMessage (message: { content: string }) {
  figma.notify(message.content)
  figma.closePlugin()
}

async function handleCommitMessage (message: {
  content: {
    versioning: 'semantic' | 'date'
    message: string
    links: Array<{ label: string, url: string }>
    version: string
  }
}) {
  try {
    const {
      versioning,
      message: description,
      links,
      version
    } = message.content

    const pageID = await getPage() ?? ''
    const page = figma.getNodeById(pageID) as PageNode
    const versionFrame = page.findOne(node => node.type === 'FRAME' && node.name === constants.CHANGELOG_FRAME_NAME) as FrameNode

    if (!versionFrame) {
      const card = await createChangelogCard()
      page.insertChild(0, card)
    }

    const setVersion: {
      data?: SceneNode
      error?: string | unknown
    } = await commit(versioning, description, links, version)

    if (setVersion.error || !setVersion.data) {
      figma.notify('Error saving the version frame. Check the changelog page.')
      figma.closePlugin()
      return
    }

    const emptyFrame = page.findOne((node) => node.name === 'empty-state')
    emptyFrame?.remove()

    const newVersionFrame = page.findOne((node) => node.name === constants.CHANGELOG_FRAME_NAME) as FrameNode
    newVersionFrame?.insertChild(1, setVersion?.data)

    figma.notify('✅ Version saved. Check your changelog page.')
    figma.closePlugin()
  } catch (error) {
    figma.notify('Error creating the version.')
    figma.closePlugin()
  }
}
