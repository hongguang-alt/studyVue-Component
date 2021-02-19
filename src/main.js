import Vue from 'vue'
import App from './App.vue'
import './index.css'
//获取全部的css样式
import "@tailwindcss/postcss7-compat/tailwind.css"

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')