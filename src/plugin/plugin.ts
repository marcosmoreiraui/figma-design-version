import getLastVersion from '../functions/getLastVersion'
import commit from '../functions/commit'
import getPage from '../functions/getPage'
import selectPage from '../functions/selectPage'
import createChangelogCard from '../functions/createChangelogCard'
import constants from '../constants'
import setClientStorage from '../functions/setClientStorage'

function bootstrap () {
  figma.showUI(__html__, {
    themeColors: true,
    width: 480,
    height: 560,
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
        case 'LAST_VERSION':
          await handleLastVersion(message)
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
    const pageID = await getPage()
    const pagesIDS = figma.root.children.filter((node) => node.type === 'PAGE')

    const pages = pagesIDS.map((page) => ({
      id: page.id,
      name: page.name
    }))

    if (!pageID) {
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
        versioning,
        pages
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

async function handleLastVersion (page: any) {
  try {
    const pageID = page.content

    const versioning = await getLastVersion(pageID)

    figma.ui.postMessage({
      type: 'LAST_VERSION',
      content: versioning
    })
  } catch (error) {
    figma.ui.postMessage({
      type: 'LAST_VERSION',
      content: 'Error loading the last version.'
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
    page: string
  }
}) {
  try {
    const {
      versioning,
      message: description,
      links,
      version,
      page
    } = message.content

    const pageID = await figma.getNodeByIdAsync(page) as PageNode
    const versionFrame = pageID.findOne(node => node.type === 'FRAME' && node.name === constants.CHANGELOG_FRAME_NAME) as FrameNode

    await setClientStorage('page', page)

    if (!versionFrame) {
      console.log('nop')
      const card = await createChangelogCard()
      pageID.insertChild(0, card)
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

    const emptyFrame = pageID.findOne((node) => node.name === 'empty-state')
    emptyFrame?.remove()

    const newVersionFrame = pageID.findOne((node) => node.name === constants.CHANGELOG_FRAME_NAME) as FrameNode
    newVersionFrame?.insertChild(1, setVersion?.data)

    figma.notify('✅ Version saved. Check your changelog page.')
    figma.closePlugin()
  } catch (error) {
    console.log(error)
    figma.notify('Error creating the version.')
    figma.closePlugin()
  }
}
