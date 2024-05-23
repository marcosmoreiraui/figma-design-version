import { type EventHandler } from '@create-figma-plugin/utilities'

export interface CreatePageHandler extends EventHandler {
  name: 'CREATE_PAGE'
  handler: (name?: string) => void
}
