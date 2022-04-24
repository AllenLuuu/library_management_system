import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import installElementPlus from './plugins/element'

window.$ = window.jQuery = require('jquery');

const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).mount('#app')