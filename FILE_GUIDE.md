# 📁 ファイル構成ガイド

WorkCheck PWA（オフライン対応版）の各ファイルの役割を説明します。

## 📂 プロジェクト構成

```
WorkCheckPWAOffline/
├── 📄 設定・ドキュメント
├── 📁 public/          # 静的ファイル
├── 📁 src/             # ソースコード
├── 📁 node_modules/    # 依存パッケージ（自動生成）
└── 📁 dist/            # ビルド結果（自動生成）
```

---

## 📄 ルートディレクトリのファイル

### 設定ファイル

#### `package.json`
**役割**: Node.jsプロジェクトの設定ファイル
```json
{
  "name": "workcheck-pwa-offline",
  "version": "0.2.0",
  "scripts": {
    "dev": "開発サーバー起動",
    "build": "本番用ビルド",
    "preview": "ビルド結果のプレビュー"
  },
  "dependencies": {
    "vue": "Vueフレームワーク",
    "vue-router": "ルーティング",
    "idb": "IndexedDB操作"
  }
}
```

#### `package-lock.json`
**役割**: 依存パッケージのバージョンをロック（自動生成）
- npmが管理する
- 編集不要

#### `vite.config.js`
**役割**: Viteビルドツールの設定
```javascript
export default defineConfig({
  plugins: [
    vue(),                    // Vueプラグイン
    // ビルド時に以下を自動コピー:
    // - web.config (IIS用)
    // - .htaccess (Apache用)
    // - sw.js (Service Worker)
  ],
  resolve: {
    alias: {
      '@': './src'            // @でsrcフォルダを参照
    }
  }
})
```

#### `.gitignore`
**役割**: Gitで管理しないファイルを指定
- `node_modules/` (依存パッケージ)
- `dist/` (ビルド結果)
- `.env` (環境変数)
- など

---

### ドキュメント

#### `README.md`
**役割**: プロジェクト全体のメインドキュメント
- 概要・機能説明
- セットアップ手順
- IIS/Apache導入方法
- トラブルシューティング

#### `MOBILE_GUIDE.md`
**役割**: iPhone/iPad (Safari) 利用ガイド
- PC側の設定（HTTPS、ファイアウォール）
- iPhone/iPad側の設定
- 詳細なトラブルシューティング

#### `QUICK_START_MOBILE.md`
**役割**: モバイル利用のクイックスタート
- 5ステップの簡単手順
- 最小限の説明

#### `FILE_GUIDE.md`
**役割**: このファイル（各ファイルの説明）

---

### デプロイスクリプト

#### `deploy-to-iis.ps1`
**役割**: IISへの自動デプロイスクリプト（Windows）
```powershell
.\deploy-to-iis.ps1 -SiteName "WorkCheckPWA" -Port 80
```
**実行内容**:
1. Node.js/IISモジュールの確認
2. `npm run build` でビルド
3. ファイルを指定パスにコピー
4. IISサイトの作成/更新
5. アプリケーションプール設定

#### `deploy-to-apache.sh`
**役割**: Apacheへの自動デプロイスクリプト（Linux）
```bash
./deploy-to-apache.sh /var/www/html/workcheck
```
**実行内容**:
1. Node.js/Apacheの確認
2. `npm run build` でビルド
3. ファイルを指定パスにコピー
4. パーミッション設定
5. mod_rewrite確認

#### `setup-https-iis.ps1`
**役割**: IISのHTTPS自動設定スクリプト
```powershell
.\setup-https-iis.ps1
```
**実行内容**:
1. 自己署名証明書の作成
2. IISへのHTTPSバインディング設定
3. アクセス用IPアドレスの表示

---

### サーバー設定ファイル

#### `web.config`
**役割**: IIS用の設定ファイル
```xml
<configuration>
  <rewrite>
    <!-- Vue Routerのhistoryモード対応 -->
    <rule name="Handle History Mode">
      <!-- すべてのリクエストをindex.htmlにリダイレクト -->
    </rule>
  </rewrite>
  <staticContent>
    <!-- MIMEタイプの設定 -->
    <mimeMap extension=".webmanifest" mimeType="application/manifest+json" />
  </staticContent>
</configuration>
```

#### `.htaccess`
**役割**: Apache用の設定ファイル
```apache
RewriteEngine On
RewriteBase /

# Vue Routerのhistoryモード対応
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]

# MIMEタイプ、圧縮、キャッシュ設定
```

---

## 📁 public/ フォルダ

**役割**: 静的ファイル（ビルド時にそのままコピーされる）

### `manifest.webmanifest`
**役割**: PWA（Progressive Web App）の設定
```json
{
  "name": "作業確認アプリ - B&MTS",
  "short_name": "作業確認",
  "start_url": "/",
  "display": "standalone",    // アプリのように全画面表示
  "theme_color": "#2563eb",   // テーマカラー
  "icons": [/* アイコン設定 */]
}
```

### `sw.js` ⭐ 重要
**役割**: Service Worker（オフライン対応の核心）
```javascript
// キャッシュバージョン
const CACHE_VERSION = 'workcheck-v1';

// インストール時
self.addEventListener('install', (event) => {
  // アプリシェルをプリキャッシュ
  cache.addAll(['/', '/index.html', ...]);
});

// フェッチ時
self.addEventListener('fetch', (event) => {
  // Cache First戦略
  // 1. キャッシュを確認
  // 2. なければネットワークから取得
  // 3. オフライン時はキャッシュから返す
});
```

### `icons/icon.svg`
**役割**: アプリアイコン
- PWAのホーム画面アイコン
- ブラウザタブのファビコン

---

## 📁 src/ フォルダ

**役割**: アプリケーションのソースコード

### メインファイル

#### `index.html`（ルート）
**役割**: HTMLエントリーポイント
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta name="viewport" content="width=device-width">
  <link rel="manifest" href="/manifest.webmanifest">
  <title>作業確認アプリ</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

#### `src/main.js` ⭐ 重要
**役割**: JavaScriptエントリーポイント
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles.css'

// Vueアプリの初期化
const app = createApp(App)
app.use(router)
app.mount('#app')

// Service Workerの登録
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}
```

#### `src/App.vue` ⭐ 重要
**役割**: ルートVueコンポーネント
```vue
<template>
  <!-- オフライン通知バー -->
  <div v-if="!isOnline" class="offline-banner">
    ⚠️ オフラインモード
  </div>
  
  <!-- ヘッダー -->
  <header>
    <h1>作業確認アプリ（オフライン対応）</h1>
    <span class="status-badge">{{ isOnline ? 'オンライン' : 'オフライン' }}</span>
  </header>
  
  <!-- ナビゲーション -->
  <nav>...</nav>
  
  <!-- メインコンテンツ -->
  <main>
    <router-view />
  </main>
</template>

<script setup>
// オンライン/オフライン状態を監視
const isOnline = ref(navigator.onLine)
window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)
</script>
```

#### `src/router.js`
**役割**: ルーティング設定
```javascript
const routes = [
  { path: '/', component: Home },        // チェック画面
  { path: '/history', component: History }, // 履歴
  { path: '/settings', component: Settings }, // 設定
  { path: '/print/:id', component: PrintSheet } // 印刷
]
```

#### `src/styles.css`
**役割**: グローバルスタイル
- 共通スタイル（ボタン、カード、フォーム）
- 印刷用CSS（`@media print`）
- レスポンシブデザイン

---

### 📁 src/views/ - 画面コンポーネント

#### `Home.vue`
**役割**: チェック画面（メイン画面）
```vue
<template>
  <!-- 基本情報入力 -->
  <input v-model="formData.operatorName" placeholder="作業者名">
  <input v-model="formData.checkerName" placeholder="確認者名">
  
  <!-- チェックリスト -->
  <ChecklistForm v-model="formData.checklist" />
  
  <!-- 署名 -->
  <button @click="openSignatureModal('operator')">署名する</button>
  
  <!-- PDF生成ボタン -->
  <button @click="handlePrint">PDF生成（印刷）</button>
</template>

<script setup>
// フォームデータの管理
// IndexedDBへの保存
// 印刷ページへの遷移
</script>
```

#### `History.vue`
**役割**: 履歴画面
```vue
<template>
  <div v-for="execution in executions">
    <!-- 実行ID、日時、作業者名などを表示 -->
    <button @click="handleReprint(execution.id)">再印刷</button>
    <button @click="handleDelete(execution.id)">削除</button>
  </div>
</template>

<script setup>
// IndexedDBから履歴を取得
// 再印刷機能
// 削除機能
</script>
```

#### `Settings.vue`
**役割**: 設定画面
```vue
<template>
  <!-- アプリの設定 -->
  <!-- データのエクスポート/インポート -->
  <!-- バージョン情報 -->
</template>
```

#### `PrintSheet.vue`
**役割**: 印刷プレビュー・印刷画面
```vue
<template>
  <div class="print-page">
    <!-- ヘッダー（ロゴ、実行ID、日付） -->
    <div class="print-header">...</div>
    
    <!-- タイトル -->
    <h1>{{ execution.templateName }}</h1>
    
    <!-- 基本情報 -->
    <div class="print-meta">...</div>
    
    <!-- チェックリスト -->
    <div class="print-checklist">
      <div v-for="item in checklistItems">
        <div class="print-check-box" :class="{ checked: ... }"></div>
        <div class="print-item-label">{{ item.label }}</div>
      </div>
    </div>
    
    <!-- 署名 -->
    <div class="print-signatures">
      <img :src="operatorSignature" alt="作業者署名">
      <img :src="checkerSignature" alt="確認者署名">
    </div>
  </div>
</template>

<script setup>
// URLパラメータから実行IDを取得
// IndexedDBからデータと署名を取得
// PDFファイル名に日時を設定
// 印刷ダイアログを表示
</script>
```

---

### 📁 src/components/ - 再利用コンポーネント

#### `ChecklistForm.vue`
**役割**: チェックリスト入力フォーム
```vue
<template>
  <div v-for="item in items">
    <!-- チェックボックス -->
    <input type="checkbox" v-model="checklist[item.id].checked">
    <label>{{ item.label }}</label>
    
    <!-- 備考欄（必要な場合） -->
    <textarea v-if="item.hasRemark" 
              v-model="checklist[item.id].remark">
    </textarea>
  </div>
</template>

<script setup>
// チェック状態の管理
// 親コンポーネントとのv-model連携
</script>
```

#### `SignatureModal.vue`
**役割**: 署名入力モーダル
```vue
<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>{{ title }}</h2>
      
      <!-- Canvas（署名を描画） -->
      <canvas ref="canvas" 
              @mousedown="startDrawing"
              @mousemove="draw"
              @mouseup="stopDrawing">
      </canvas>
      
      <button @click="clear">クリア</button>
      <button @click="save">保存</button>
    </div>
  </div>
</template>

<script setup>
// Canvas APIで署名を描画
// タッチイベント対応（スマホ・タブレット）
// Base64形式でデータURL生成
// 親コンポーネントに送信
</script>
```

---

### 📁 src/stores/ - データ管理

#### `db.js` ⭐ 重要
**役割**: IndexedDB操作（データ永続化）
```javascript
import { openDB } from 'idb'

// データベース初期化
export async function initDB() {
  return await openDB('WorkCheckDB', 1, {
    upgrade(db) {
      // executions: 実行履歴
      db.createObjectStore('executions', { keyPath: 'id' })
      
      // blobs: 署名画像
      db.createObjectStore('blobs', { keyPath: 'id' })
      
      // meta: メタデータ（連番カウンター）
      db.createObjectStore('meta', { keyPath: 'key' })
    }
  })
}

// データ保存・取得・削除の関数群
export async function saveExecution(data) { ... }
export async function getExecutions(limit) { ... }
export async function getExecution(id) { ... }
export async function deleteExecution(id) { ... }
export async function saveBlob(id, dataUrl) { ... }
export async function getBlob(id) { ... }
export async function getNextRunNumber(date) { ... }
```

**データ構造**:
```javascript
// executions
{
  id: "20251015-001",
  timestamp: "2025-10-15T10:30:00.000Z",
  templateName: "標準作業確認チェックリスト",
  operatorName: "山田太郎",
  checkerName: "佐藤花子",
  checklist: {
    item1: { checked: true, remark: "問題なし" },
    item2: { checked: true }
  }
}

// blobs
{
  id: "20251015-001_operator_signature",
  dataUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..."
}

// meta
{
  key: "runCounter_20251015",
  value: 3
}
```

---

### 📁 src/composables/ - ロジック関数

#### `useRunId.js`
**役割**: 実行ID生成ロジック
```javascript
export async function generateRunId() {
  // 今日の日付を取得 (YYYYMMDD)
  const today = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\//g, '')
  
  // IndexedDBから連番を取得
  const num = await getNextRunNumber(today)
  
  // フォーマット: YYYYMMDD-NNN
  return `${today}-${String(num).padStart(3, '0')}`
}
```

**出力例**: `20251015-001`, `20251015-002`, ...

---

### 📁 src/assets/ - 静的リソース

#### `logo.svg`
**役割**: B&MTSのロゴ画像
- ヘッダーに表示
- 印刷時にも表示

#### `checklist.template.json` ⭐ カスタマイズ可能
**役割**: チェックリストテンプレート
```json
{
  "templateName": "標準作業確認チェックリスト",
  "version": "1.0",
  "items": [
    {
      "id": "item1",
      "label": "作業前の安全確認を実施しましたか",
      "hasRemark": true,
      "remarkMaxLength": 50
    },
    {
      "id": "item2",
      "label": "必要な工具・機材を準備しましたか",
      "hasRemark": true
    }
  ]
}
```

**カスタマイズ方法**:
- `items` 配列に項目を追加・編集
- `id`: 一意のID（item1, item2, ...）
- `label`: チェック項目の文言
- `hasRemark`: 備考欄の有無
- `remarkMaxLength`: 備考の最大文字数（オプション）

---

## 📁 自動生成フォルダ

### `node_modules/`
**役割**: npmパッケージの保存場所
- `npm install` で自動生成
- Gitで管理しない（.gitignoreに記載）
- 削除しても `npm install` で復元可能

### `dist/`
**役割**: ビルド結果の出力先
- `npm run build` で自動生成
- 本番環境にデプロイするのはこのフォルダ
- Gitで管理しない（.gitignoreに記載）

**内容**:
```
dist/
├── index.html          # 最適化されたHTML
├── manifest.webmanifest
├── sw.js              # Service Worker
├── web.config         # IIS設定（自動コピー）
├── .htaccess          # Apache設定（自動コピー）
├── icons/             # アイコン
└── assets/            # 最適化されたJS/CSS
    ├── index-xxx.js   # ハッシュ付きファイル名
    └── index-xxx.css
```

---

## 🔄 ファイルの連携図

```
index.html
  └─> src/main.js
       ├─> App.vue
       │    └─> router-view
       │         ├─> Home.vue
       │         │    ├─> ChecklistForm.vue
       │         │    └─> SignatureModal.vue
       │         ├─> History.vue
       │         ├─> Settings.vue
       │         └─> PrintSheet.vue
       │
       ├─> router.js (ルーティング)
       ├─> styles.css (スタイル)
       └─> Service Worker登録
            └─> /sw.js

データフロー:
  src/views/*.vue
    ↓ 保存
  src/stores/db.js
    ↓
  IndexedDB (ブラウザ内)
```

---

## 📝 編集するべきファイル

### よく編集するファイル

| ファイル | 目的 |
|---------|------|
| `src/assets/checklist.template.json` | チェック項目のカスタマイズ |
| `src/assets/logo.svg` | ロゴ変更 |
| `public/manifest.webmanifest` | アプリ名・色のカスタマイズ |
| `src/styles.css` | デザイン変更 |

### あまり編集しないファイル

| ファイル | 目的 |
|---------|------|
| `src/views/*.vue` | 機能追加・変更 |
| `src/components/*.vue` | コンポーネント改良 |
| `src/stores/db.js` | データ構造変更 |
| `public/sw.js` | キャッシュ戦略変更 |

### 編集してはいけないファイル

| ファイル | 理由 |
|---------|------|
| `package-lock.json` | npm自動管理 |
| `node_modules/` | パッケージ格納場所 |
| `dist/` | ビルド結果（自動生成） |

---

## 🎯 ユースケース別ファイル一覧

### チェック項目を変更したい
- ✏️ `src/assets/checklist.template.json`

### ロゴを変更したい
- ✏️ `src/assets/logo.svg`
- ✏️ `public/icons/icon.svg`

### アプリ名を変更したい
- ✏️ `public/manifest.webmanifest` (name, short_name)
- ✏️ `index.html` (title)
- ✏️ `package.json` (name)

### 印刷レイアウトを変更したい
- ✏️ `src/styles.css` (@media print セクション)
- ✏️ `src/views/PrintSheet.vue`

### デザインを変更したい
- ✏️ `src/styles.css` (グローバルスタイル)
- ✏️ `src/App.vue` (ヘッダー・フッター)
- ✏️ `src/views/*.vue` (各画面)

### 機能を追加したい
- ✏️ `src/views/*.vue` (新しい画面)
- ✏️ `src/router.js` (ルート追加)
- ✏️ `src/stores/db.js` (データ構造変更)

---

## 📚 学習の順序

初めてコードを読む場合、以下の順序がおすすめ：

1. `README.md` - 全体像を把握
2. `index.html` - エントリーポイント
3. `src/main.js` - アプリ初期化
4. `src/App.vue` - ルートコンポーネント
5. `src/router.js` - ルーティング
6. `src/views/Home.vue` - メイン画面
7. `src/stores/db.js` - データ管理
8. `public/sw.js` - オフライン対応

---

これで全ファイルの役割が理解できるはずです！ 🎉

