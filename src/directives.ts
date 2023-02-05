// import { app } from './main'

export function water(app: any) {
  app.directive('focus', (el: any) => {
    // 这会在 `mounted` 和 `updated` 时都调用
    console.log(el)
  })
}
