function getTheme (css: string): 'light' | 'dark' | 'inherit' | undefined {
  const match = css.match(/--figma-color-bg: (#[0-9a-fA-F]{6});/)
  if (match) {
    return match[1] === '#ffffff' ? 'light' : 'dark'
  }
  return 'inherit'
}

export default getTheme
