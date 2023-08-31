import { createApp } from 'vue'
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import App from './App.vue'
import { store } from './store'
import router from './router'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css
import '@/icons' // icon
import '@/permission' // permission control

import SvgIcon from '@/components/SvgIcon'// svg component

// 方法：注册 FontAwesomeIcon 组件
import regAwesomeIcon from '@/utils/register-font-awesome-icon'

const app = createApp(App)
app.use(ElementPlus, { locale })
app.use(store)
app.use(router)
app.component('svg-icon', SvgIcon)
app.mount('#app')

regAwesomeIcon(app)