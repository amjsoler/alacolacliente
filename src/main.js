import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/bootstrap.min.css'
import './assets/css/googlefonts.css'

import './assets/css/estilos-generales.css'

createApp(App).use(store).use(router).mount('#app')
