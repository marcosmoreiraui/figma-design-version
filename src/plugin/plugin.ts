import getLastVersion, { getVersionType } from '../functions/getLastVersion'
import commit from '../functions/commit'
import getPage from '../functions/getPage'
import selectPage from '../functions/selectPage'
import createChangelogCard from '../functions/createChangelogCard'

function bootstrap () {
  figma.showUI(__html__, {
    themeColors: true,
    width: 350,
    height: 400,
    title: 'Design version'
  })

  figma.ui.onmessage = async (message) => {
    if (message.type === 'INITIALIZE') {
      try {
        const hasPage = await getPage()
        const versioning = await getVersionType()
        const lastVersion = versioning === 'date' ? '' : await getLastVersion()
        const pagesIDS = figma.root.children.filter((node) => node.type === 'PAGE')
        const pages = pagesIDS.map((page) => ({
          id: page.id,
          name: figma.getNodeById(page.id)?.name
        }))

        const values = [hasPage, versioning, lastVersion, pages]

        figma.ui.postMessage({
          type: 'INITIALIZE',
          content: values
        })
      } catch (error) {
        console.log(error)
        figma.ui.postMessage({
          type: 'ERROR',
          content: 'Error initializing the plugin.'
        })
      }
    }

    if (message.type === 'SELECT_PAGE') {
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

    if (message.type === 'HAS_PAGE') {
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

    if (message.type === 'VERSIONING') {
      try {
        const versioning = await getVersionType()
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

    if (message.type === 'GET_LAST_VERSION') {
      try {
        const response = await getLastVersion()
        figma.ui.postMessage({
          type: 'GET_LAST_VERSION',
          content: response
        })
      } catch (error) {
        figma.ui.postMessage({
          type: 'GET_LAST_VERSION',
          content: 'Error getting the last version.'
        })
      }
    }

    if (message.type === 'ERROR') {
      figma.notify(message.content)
      figma.closePlugin()
    }

    if (message.type === 'COMMIT') {
      try {
        const {
          versioning,
          message: description,
          links,
          version
        } = message.content

        const pageID = await getPage() ?? ''
        const page = figma.getNodeById(pageID) as PageNode
        const versionFrame = page.findOne(node => node.type === 'FRAME' && node.name === 'changelog-dv') as FrameNode

        if (!versionFrame) {
          const card = await createChangelogCard()
          page.insertChild(0, card)
        }

        const setVersion: {
          data?: SceneNode
          error?: string | unknown
        } = await commit(versioning, description, links, version)

        if (setVersion.error || !setVersion.data) {
          console.log('error', setVersion.error)
          figma.notify('Error saving the version frame. Check the changelog page.')
          figma.closePlugin()
          return
        }

        const emptyFrame = page.findOne((node) => node.name === 'empty-state')

        emptyFrame?.remove()
        const newVersionFrame = page.findOne((node) => node.name === 'changelog-dv') as FrameNode
        newVersionFrame?.insertChild(1, setVersion?.data)
        figma.notify('✅ Version saved. Check your changelog page.')
        figma.closePlugin()
      } catch (error) {
        figma.notify('Error creating the version.')
        figma.closePlugin()
      }
    }
  }
}

bootstrap()
