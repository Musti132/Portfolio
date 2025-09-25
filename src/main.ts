import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ToolTipDirective from './utils/tooltip';
import './css/app.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { useThemeStore } from '@/stores/theme';
import { createPinia } from 'pinia'

const pinia = createPinia()

library.add(fas, far, fab);
const app = createApp(App);

app.component('FontAwesomeIcon', FontAwesomeIcon);
app.directive('tooltip', ToolTipDirective);

app.use(router);
app.use(pinia)

const { initTheme } = useThemeStore();
initTheme();

app.mount('#app');
