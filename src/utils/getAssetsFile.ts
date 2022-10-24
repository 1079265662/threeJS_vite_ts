// 封装静态资源引用方法
export const getAssetsFile = (url: string) => {
  return new URL(`../assets/${url}`, import.meta.url).href
}
// export { getAssetsFile }
