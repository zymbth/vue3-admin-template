import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css'
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

// 先导入图标，再使用
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChalkboard, faFolderOpen, faUser, faUsers, faUserFriends, faThList } from '@fortawesome/free-solid-svg-icons'

library.add(faChalkboard, faFolderOpen, faUser, faUsers, faUserFriends, faThList)

// const req = require.context('./svg', false, /\.svg$/)
// const requireAll = requireContext => requireContext.keys().map(requireContext)
// requireAll(req)

const app = createApp(App)
app.use(ElementPlus, { locale })
app.use(store)
app.use(router)
app.use(window.countTo)
app.component('svg-icon', SvgIcon)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')