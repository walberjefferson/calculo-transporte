import {createApp} from 'vue'

import './style.css'
import 'primeicons/primeicons.css'

import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import App from './App.vue'

const pinia = createPinia()

const app = createApp(App);
app.use(pinia)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: 'none',
            cssLayer: {
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities'
            }
        }
    }
});
app.mount('#app');
