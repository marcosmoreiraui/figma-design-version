import createPage from '../functions/createPage'
import hasPage from '../functions/hasPage'
import getLastVersion, { getVersionType } from '../functions/getLastVersion'
import commit from '../functions/commit'
import getPage from '../functions/getPage'

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
        const bol = await hasPage()
        const versioning = await getVersionType()
        const response = versioning === 'date' ? '' : await getLastVersion()

        void Promise.all([bol, versioning, response]).then((values) => {
          figma.ui.postMessage({
            type: 'INITIALIZE',
            content: values
          })
        })
      } catch (error) {
        console.log(error)
        figma.ui.postMessage({
          type: 'ERROR',
          content: 'Error initializing the plugin.'
        })
      }
    }

    if (message.type === 'CREATE_PAGE') {
      try {
        await createPage(message.content)
        figma.ui.postMessage({
          type: 'CREATE_PAGE',
          content: 'success'
        })
      } catch (error) {
        figma.ui.postMessage({
          type: 'CREATE_PAGE',
          content: 'Error creating the changelog page.'
        })
      }
    }

    if (message.type === 'HAS_PAGE') {
      try {
        const bol = await hasPage()
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

        const pageID = await getPage()
        const main = figma.getNodeById(pageID as any) as PageNode

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

        const emptyFrame = main.findOne((node) => node.name === 'empty-state')

        emptyFrame?.remove()

        main.insertChild(1, setVersion?.data)
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
