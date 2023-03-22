import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './route/index.ts'
import vant from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';
const pinia = createPinia();
// 3. 注册你需要的组件
createApp(App).use(pinia).use(vant).use(router).mount('#app')
