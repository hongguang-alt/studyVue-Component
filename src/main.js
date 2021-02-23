import Vue from 'vue'
import App from './App.vue'
import './index.css'
import Alert from './components/alert/alert.js'
//获取全部的css样式
// import "@tailwindcss/postcss7-compat/tailwind.css"

Vue.config.productionTip = false
Vue.prototype.$Alert = Alert

new Vue({
  render: h => h(App),
}).$mount('#app')