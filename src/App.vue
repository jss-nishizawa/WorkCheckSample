<template>
  <div id="app-container" class="app-container">
    <header v-if="!hideNav" class="app-header no-print">
      <div class="header-content">
        <img 
          v-if="logoUrl" 
          :src="logoUrl" 
          :alt="companyName" 
          class="header-logo" 
        />
        <img 
          v-else 
          src="@/assets/logo.svg" 
          :alt="companyName" 
          class="header-logo" 
        />
        <h1 class="header-title">作業確認アプリ</h1>
      </div>
    </header>

    <nav v-if="!hideNav" class="app-nav no-print">
      <router-link to="/" :class="{ active: $route.name === 'Home' }">チェック</router-link>
      <router-link to="/history" :class="{ active: $route.name === 'History' }">履歴</router-link>
      <router-link to="/templates" :class="{ active: $route.name === 'TemplateManager' }">テンプレート</router-link>
      <router-link to="/settings" :class="{ active: $route.name === 'Settings' }">設定</router-link>
    </nav>

    <main class="app-main">
      <router-view />
    </main>

    <footer v-if="!hideNav" class="app-footer no-print">
      <p>&copy; {{ companyName }}</p>
    </footer>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { COMPANY_NAME } from '@/config/constants'
import { getCompanyConfig, getCompanyLogo } from '@/stores/db'

const route = useRoute()
const hideNav = computed(() => route.meta.hideNav || false)

// 会社情報とロゴ
const companyName = ref(COMPANY_NAME)
const logoUrl = ref(null)

// 会社情報とロゴを読み込む
const loadCompanyInfo = async () => {
  try {
    // 会社情報を読み込む
    const config = await getCompanyConfig()
    if (config && config.companyName) {
      companyName.value = config.companyName
    }
    
    // ロゴを読み込む
    const logo = await getCompanyLogo()
    if (logo && logo.trim() !== '') {
      logoUrl.value = logo
    } else {
      // デフォルトロゴを使用
      logoUrl.value = null
    }
  } catch (error) {
    console.error('会社情報読み込みエラー:', error)
    // エラー時はデフォルト値を使用
    companyName.value = COMPANY_NAME
    logoUrl.value = null
  }
}

onMounted(() => {
  loadCompanyInfo()
})
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  color: white;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-logo {
  max-height: 48px;
  height: auto;
}

.header-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.app-nav {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: center;
  padding: 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.app-nav a {
  flex: 1;
  text-align: center;
  padding: 1rem;
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
}

.app-nav a:hover {
  background: #f9fafb;
  color: #2563eb;
}

.app-nav a.active {
  color: #2563eb;
  border-bottom-color: #2563eb;
  background: #eff6ff;
}

.app-main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
}

.app-footer {
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  padding: 1rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
}

/* 印刷時のスタイル調整 */
@media print {
  .app-container {
    min-height: 0 !important;
    display: block !important;
  }
  
  .app-main {
    padding: 0 !important;
    margin: 0 !important;
    max-width: none !important;
  }
}

@media (max-width: 640px) {
  .header-title {
    font-size: 1.25rem;
  }
  
  .header-logo {
    max-height: 40px;
  }
  
  .app-main {
    padding: 1rem;
  }
}
</style>

