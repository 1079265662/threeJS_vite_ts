// eslint-disable-next-line @typescript-eslint/no-unused-vars
import App from '@/App.vue'
// 定义了全局方法之后需要扩充类型
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $b: {
      reset: string
    }
  }
}
