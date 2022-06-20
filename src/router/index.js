/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'


// import MSite from '../pages/MSite'
// import Search from '../pages/Search'
// import Order from '../pages/Order'
// import Profile from '../pages/Profile'

const MSite = () => import('../pages/Msite')
const Search = () => import('../pages/Search')
const Order = () => import('../pages/Order')
const Profile = () => import('../pages/Profile')

import Login from '../pages/Login'
import Shop from '../pages/Shop'
import ShopGoods from '../pages/Shop/ShopGoods'
import ShopRatings from '../pages/Shop/ShopRatings'
import ShopInfo from '../pages/Shop/ShopInfo'

// 声明使用插件
Vue.use(VueRouter)

export default new VueRouter({
  // 所有路由
  routes: [
    {
      path: '/msite',
      component: MSite, // 返回路由组件的函数, 只有执行此函数才会加载路由组件, 这个函数在请求对应的路由路径时才会执行
      meta: {
        show: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        show: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        show: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        show: true
      }
        },
    // 重定向
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/login',
      component: Login,
      meta: {
        show: false
      }
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '',
          redirect: '/shop/goods'
        },
      ]
    },
  ]
})