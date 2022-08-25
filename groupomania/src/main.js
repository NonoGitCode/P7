import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import router from './router'
import App from './App.vue'

library.add(faThumbsUp)

createApp(App)
    .component('fa', FontAwesomeIcon)
    .use(router)
    .mount('#app');
