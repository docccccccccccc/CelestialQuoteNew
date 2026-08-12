import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())

app.mount('#app')
