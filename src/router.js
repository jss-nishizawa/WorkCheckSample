import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import History from './views/History.vue'
import Settings from './views/Settings.vue'
import PrintSheet from './views/PrintSheet.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'チェック' }
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: { title: '履歴' }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { title: '設定' }
  },
  {
    path: '/print/:id',
    name: 'PrintSheet',
    component: PrintSheet,
    meta: { title: '印刷', hideNav: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // スクロール動作を制御する関数を追加
  scrollBehavior(to, from, savedPosition) {
    // 印刷画面に遷移する場合は常に最上部にスクロール
    if (to.name === 'PrintSheet') {
      return { top: 0 }
    }
    // 印刷画面から戻る場合は最上部にスクロール
    if (from.name === 'PrintSheet') {
      return { top: 0 }
    }
    // その他の場合はブラウザのデフォルト動作（保存された位置に戻る）
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router

