import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles.css'

const app = createApp(App)
app.use(router)
app.mount('#app')

// vite-plugin-pwa が自動的にService Workerを登録します
// 手動登録は不要です

