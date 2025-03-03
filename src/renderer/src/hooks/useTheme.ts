import { useEffect, useState } from 'react'
import { themes, ThemeKey } from '../theme/theme'

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('light')

  useEffect(() => {
    // 从 localStorage 读取主题设置
    const savedTheme = localStorage.getItem('theme') as ThemeKey
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    // 应用主题变量
    const theme = themes[currentTheme]
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })

    // 保存主题设置
    localStorage.setItem('theme', currentTheme)
  }, [currentTheme])

  return {
    currentTheme,
    themes: Object.keys(themes) as ThemeKey[],
    setTheme: (theme: ThemeKey) => setCurrentTheme(theme)
  }
}
