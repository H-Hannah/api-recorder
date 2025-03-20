// vue项目的入口配置文件
import {createApp} from 'vue'
import App from './components/Handle.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const app = createApp(App);
app.use(ElementPlus);
app.mount('#app');
