export interface Note {
  noteId: string
  pathChain?: string[]
}

/*
 * 记录路径链
 * @param item 笔记详情
 */
export function recordPathChain(item: Note): void {
  let _pathChain: string = localStorage.getItem('pathChain') || '[]'
  let chain: string[] = _pathChain ? JSON.parse(_pathChain as string) : []
  const { noteId, pathChain } = item
  if (pathChain && pathChain.length > 0) {
    chain = pathChain
    if (!chain.includes(noteId)) {
      chain.push(noteId)
    } else {
      let index = chain.findIndex((item) => item === noteId)
      chain = chain.slice(0, index + 1)
    }
  } else {
    chain = []
    chain.push(noteId)
  }
  localStorage.setItem('pathChain', JSON.stringify(chain))
}

/*
 * 获取路径链
 * @param
 */
export const getPathChain = () => {
  let pathChain: string = localStorage.getItem('pathChain') || '[]'
  return JSON.parse(pathChain)
}
