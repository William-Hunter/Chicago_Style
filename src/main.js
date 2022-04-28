import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueClipboard from 'vue-clipboard2'
// import Message from 'element-ui'
import HtmlUtil from './assets/utils/tools'


Vue.use(ElementUI)
VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)
// Vue.prototype.$message = Message

Vue.use(HtmlUtil)

new Vue({
  el: '#app',
  render: h => h(App)
})
