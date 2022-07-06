import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button } from 'mint-ui'
import VueLazeload from 'vue-lazyload'
import './filters' // 加载过滤器
import '@/mock/mockServer'
Vue.config.productionTip = false

import loading from './common/images/loading.gif'
// 注册全局组件标签
Vue.component(Button.name, Button)  // <mt-button>
Vue.use(VueLazeload, { // 内部自定义一个指令lazy
    loading
  })
new Vue({
    el: '#app',
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus=this  //全局事件总线
    },
    router,
    store
})