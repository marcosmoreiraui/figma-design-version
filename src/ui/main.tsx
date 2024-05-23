import React from 'react'
import ReactDOM from 'react-dom/client'
import { Theme } from '@radix-ui/themes'
import getTheme from '@functions/getTheme'

async function bootstrap () {
  const App = (await import('./app')).default

  const rootElement = document.getElementById('root')
  const root = ReactDOM.createRoot(rootElement as any)
  let mode: 'inherit' | 'light' | 'dark' | undefined = 'inherit'
  const theme = document?.getElementById('figma-style')?.innerHTML
  if (theme) mode = getTheme(theme)
  root.render(
    <React.StrictMode>
      <Theme id="theme" accentColor="violet" grayColor="mauve" radius="medium" scaling="90%" appearance={mode}>
        <App/>
      </Theme>
    </React.StrictMode>
  )
}

void bootstrap()
