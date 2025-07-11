import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import tippy from 'vue-tippy'

import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light-border.css'

import './styles/index.css'

import 'cal-sans'
import '@fontsource/inter/100.css'
import '@fontsource/inter/200.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import './styles/global.css'

const app = createApp(App)

app.use(router)
app.use(
  tippy,
  {
    directive: 'tippy', // => v-tippy
    component: 'tippy', // => <tippy/>
  }
)

app.mount('#app') 