import { Dropdown, Space } from 'antd'
import { useTheme } from '../hooks/useTheme'

export const ThemeSelector = () => {
  const { currentTheme, themes, setTheme } = useTheme()

  const items = themes.map((theme) => ({
    key: theme,
    label: (
      <div
        style={{
          padding: '8px',
          background: `var(--bg-color, #fff)`,
          color: `var(--text-color, #000)`
        }}
        onClick={() => setTheme(theme)}
      >
        {theme}
      </div>
    )
  }))

  return (
    <Dropdown menu={{ items }}>
      <Space>当前主题：{currentTheme}</Space>
    </Dropdown>
  )
}
