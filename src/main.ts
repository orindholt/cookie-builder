import './assets/main.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'

import ToastService from 'primevue/toastservice'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'
import App from './App.vue'
import FocusTrap from 'primevue/focustrap'
import Tooltip from 'primevue/tooltip'

const app = createApp(App)

app.directive('tooltip', Tooltip)
app.directive('focus-trap', FocusTrap)

app.use(PrimeVue)
app.use(ToastService)

app.mount('#app')
