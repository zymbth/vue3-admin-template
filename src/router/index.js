import { createRouter, createWebHashHistory } from 'vue-router'

/* Layout */
import Layout from '@/layout'

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

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '面板', icon: 'fa-chalkboard', affix: true }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/icon',
    name: 'Example',
    meta: { title: 'Example', icon: 'fa-list' },
    children: [
      {
        path: 'icon',
        name: 'ExampleDashboard',
        component: () => import('@/views/example/icon'),
        meta: { title: '图标', icon: 'far-face-smile' }
      },
      {
        path: 'user',
        component: () => import('@/views/example/user/index'),
        redirect: '/example/user/list',
        name: 'ExampleUser',
        meta: { title: '用户管理', icon: 'fa-list' },
        children: [
          {
            path: 'list',
            name: 'ExampleUserList',
            meta: { title: '用户列表', icon: 'fa-user' },
            component: () => import('@/views/example/user/list')
          },
          {
            path: 'relations',
            name: 'ExampleUserRelations',
            meta: { title: '亲属关系', icon: 'fa-circle' },
            component: () => import('@/views/example/user/relations')
          }
        ]
      },
      {
        path: 'product',
        component: () => import('@/views/example/product/index'),
        redirect: '/example/product/list',
        name: 'ExampleProduct',
        meta: { title: '产品管理', icon: 'fa-circle' },
        children: [
          {
            path: 'list',
            name: 'ExampleProductList',
            meta: { title: '产品列表', icon: 'fa-circle' },
            component: () => import('@/views/example/product/list')
          }
        ]
      },
    ]
  },

  // {
  //   path: '/external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }
]

const createRouter1 = createRouter({
  // mode: 'history', // require service support
  history: createWebHashHistory(),
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter1

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter1
  router.matcher = newRouter.matcher // reset router
}

export default router
