# Vue3 Admin Template

将大佬的项目 [PanJiaChen / vue-admin-template](https://github.com/PanJiaChen/vue-admin-template) 迁移到 `vue3` & `element plus`，解决兼容问题，方便快速创建一个管理系统。

项目使用 `vue-cli` 创建一个基于 `vue3` 全家桶以及 `element plus` 的项目。在布局组件下显示页面，布局组件包括左侧可收缩/展开的菜单栏，右侧顶部导航栏+用户菜单，右下方为页面视图。详细功能设计请参看源项目

本项目在线体验：[zymbth.github.io/vue3-admin-template/](https://zymbth.github.io/vue3-admin-template/)

---

## 一、npm 脚本

使用 `npm/yarn` 或其他包管理器，相关 npm 脚本：

安装依赖：`yarn install` or `npm install`

编译开发：`yarn dev` or `npm run dev`

打包：`yarn build` or `npm run build`

---

## 二、项目目录结构

```text
├ .github 配置文件，可删除
├ dist 编译输出目录
├ public 静态资源
│ └ index.html 项目主页
├ src 源码目录
│ ├ api 接口
│ ├ assets 资源
│ ├ components 组件
│ ├ icons svg图标
│ ├ layout 布局容器组件
│ ├ router 路由
│ ├ store 状态存储
│ ├ styles 样式
│ ├ utils 工具方法
│ ├ views/**/*.vue 页面
│ ├ App.vue 项目根组件
│ ├ main.js 项目入口
│ ├ permission.js 权限验证
│ └ settings.js 项目相关配置
│
├ .env.* 环境变量配置文件(vue-cli)
├ .env.*.local 本地环境变量配置文件(vue-cli)
├ .gitignore
├ package.json
├ vue.config.js
└ README.md
```

需要注意并了解清楚的有：

- 布局容器组件 layout

```text
├ src 源码目录
│ ├ layout 布局容器组件
│ │ ├ components 组件
│ │ │ ├ Sidebar 侧边菜单栏
│ │ │ ├ TagsView 顶部标签栏
│ │ │ ├ AppMain.vue 主视图/页面视图组件
│ │ │ ├ Navbar.vue 用户菜单组件
│ │ │ └ index.js 组件聚合
│ │ ├ mixin 混入逻辑
│ │ └ index.vue 根组件
```

- 路由-菜单的关联
- svg图标的封装与使用：[vue-element-admin - Svg Icon 图标](https://panjiachen.github.io/vue-element-admin-site/zh/feature/component/svg-icon.html#%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F)
- 权限验证，项目中仅提供了简单的示例，需根据实际需求调整完善

---

## 三、主要依赖

项目主要依赖介绍

### `element-plus@2.3.12`

UI 框架

> 官网：[Element Plus](https://element-plus.gitee.io/zh-CN/)

element plus 图标如有需要，需单独引入，参照官网[指引](https://element-plus.org/zh-CN/component/icon.html)

### `font-awesome-icon`

个人喜好，可使用其它图标

> 官网：[Font Awesome](https://fontawesome.com/)

`@fortawesome/fontawesome-svg-core`, `@fortawesome/free-solid-svg-icons`: 核心包和图标

`@fortawesome/vue-fontawesome`: vue 组件

`@fortawesome/free-brands-svg-icons`, `@fortawesome/free-regular-svg-icons`: 其他样式图标（免费）

统一在 `src\utils\register-font-awesome-icon.js` 中手动引入并注册全局组件

参照官网，注意在 vue3 中的[引入](https://fontawesome.com/v6/docs/web/use-with/vue/)及使用规范

### `axios`

接口封装

---

## 四、功能模块设计

### 1. 主题样式

#### UI插件

项目使用的 UI 插件为 [Element Plus](https://element-plus.gitee.io/zh-CN/)，实际项目中可能需要更改其主题色，方案参照其官网[指引](https://element-plus.org/zh-CN/guide/theming.html)

#### 样式定义与引入

主样式文件为 [src/styles/index.scss](src/styles/index.scss)，其中，引入了其它样式文件。

其它样式：

- [src/styles/mixin.scss](src/styles/mixin.scss)：混入样式
- [src/styles/transition.scss](src/styles/transition.scss)：vue 转换样式
- [src/styles/variables.scss](src/styles/variables.scss)：sass 变量

#### 移动端样式适配

布局组件中混入逻辑 [src/layout/mixin/ResizeHandler.js](src/layout/mixin/ResizeHandler.js)，监听窗口变化，根据屏幕尺寸判断是否是移动端。

详细样式适配方案需自拟

### 2. svg 图标

> 封装参考
>
> [vue3 封装 svg 图标组件](https://juejin.cn/post/7213983712731906106)
>
> [vue-element-admin - Svg Icon 图标](https://panjiachen.github.io/vue-element-admin-site/zh/feature/component/svg-icon.html#%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F)
>
> [手摸手，带你优雅的使用 icon](https://juejin.cn/post/6844903517564436493)

### 3. 路由

路由对应系统菜单，实际菜单及分级从路由中自动生成。路由中，还包含title、图标、权限、面包屑导航等信息，参考路由文件备注信息

```js
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
```

### 4. 接口封装与登录验证

常规 axios 封装方案，可总结如下：

```js
import axios from 'axios'

const service = axios.create(config)
service.interceptors.request.use(requestHandler, requestErrorHandler)
service.interceptors.response.use(responseHandler, responseErrorHandler)

export default service
```

其中，`config` 为默认的配置，请求拦截器、响应拦截器中分别设置正确处理与错误处理方法，实现细节可根据具体项目需求调整。

### 5. 权限设计

需根据项目自行调整实现
