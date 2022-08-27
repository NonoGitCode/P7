import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import router from './router'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

library.add(faThumbsUp)

createApp(App).use(store)
    .component('fa', FontAwesomeIcon)
    .use(router)
    .use(store)
    .mount('#app');
