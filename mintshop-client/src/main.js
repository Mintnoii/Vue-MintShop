// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入路由 其实就是router文件夹下的index.js配置好的路由表
import router from './router'
// 引入Vuex的store对象
import store from './store'

// 引入VueLazyload插件
import VueLazyload from 'vue-lazyload'
// 将一张loading图片加载进来
import loading from './common/imgs/loading.gif'

// 引入fastclick并绑定到body 解决移动端点击响应延迟0.3s的问题
import FastClick from 'fastclick'
import './filters'
// 加载mockServer
import './mock/mockServer.js'
// 注冊全局组件标签
import {Button} from 'mint-ui'
Vue.component(Button.name, Button) // <mt-button>

FastClick.attach(document.body)
Vue.config.productionTip = false

Vue.use(VueLazyload, { // 内部自定义一个指令lazy
  loading
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 为根组件加入路由
  router,
  store
})
