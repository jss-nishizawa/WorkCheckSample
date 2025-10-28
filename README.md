# 作業確認アプリ（WorkCheck PWA）- オフライン対応版

現場作業のチェックリストと署名によるPDF生成を行うプログレッシブWebアプリケーション（PWA）です。

**🌟 このバージョンは完全なオフライン対応版です！**

## 📋 概要

このアプリケーションは、現場作業における作業確認プロセスをデジタル化するために開発されました。作業者と確認者がチェックリストを記入し、デジタル署名を行うことで、印刷用のPDFを生成できます。**オフラインでも完全に動作**し、履歴管理機能により過去の作業記録を簡単に参照・再印刷できます。

## ✨ 主な機能

- **チェックリスト管理**: カスタマイズ可能なチェック項目の入力
- **デジタル署名**: 作業者と確認者のタッチ署名機能
- **PDF生成**: ブラウザの印刷機能を使用したPDF出力
- **履歴管理**: IndexedDBによるローカルデータ保存
- **🌐 完全なオフライン対応**: ネットワークなしで全機能が動作
- **📱 PWAインストール**: ホーム画面に追加してアプリのように使用可能
- **モバイル対応**: レスポンシブデザイン
- **簡単デプロイ**: IIS・Apache両対応の自動デプロイスクリプト付き

## 🚀 技術スタック

- **フレームワーク**: Vue 3.4.21（Composition API）
- **ルーティング**: Vue Router 4.3.0
- **ビルドツール**: Vite 5.1.6
- **データベース**: IndexedDB（idb 8.0.0）
- **オフライン対応**: Workbox（vite-plugin-pwa 1.1.0）
- **スタイリング**: カスタムCSS（印刷CSS対応）
- **PWA**: Web App Manifest + Service Worker
- **開発環境**: Node.js v18以上推奨

## 🌟 オフライン機能の特徴

### ✅ できること

1. **初回アクセス後、完全にオフラインで動作**
   - ネットワーク接続不要でアプリを起動
   - すべての画面・機能がオフラインで利用可能

2. **データはすべてローカルに保存**
   - チェック履歴
   - 署名画像
   - 実行ID

3. **オンライン/オフライン状態の自動検知**
   - 画面上にステータス表示
   - ネットワーク状態に応じて自動切り替え

4. **自動更新**
   - ネットワーク復帰時に最新版を自動チェック
   - ユーザーに確認してから更新

5. **タスク削除後も安定動作**（v2で改善）
   - iPhoneのタスク一覧から削除しても
   - オフライン状態で再起動可能
   - 冗長キャッシュ戦略により安定性向上

### 📊 キャッシュ戦略（v2 改善版）

- **2層キャッシュシステム**: メインキャッシュ + ランタイムキャッシュで冗長化
- **アプリシェル**: 事前キャッシュ（即座に起動）
- **リソース（JS/CSS/画像）**: 積極的キャッシュ + Cache First（高速表示）
- **データ**: IndexedDB（オフライン保存）
- **フォールバック**: 複数キャッシュから検索、安定性向上

## 📦 プロジェクト構成

```
WorkCheckPWAOffline/
├── public/
│   ├── icons/
│   │   └── icon.svg             # PWAアイコン（SVG形式）
│   └── manifest.webmanifest     # PWAマニフェスト
├── src/
│   ├── assets/
│   │   ├── checklist.template.json # チェックリストテンプレート
│   │   └── logo.svg             # ヘッダーロゴ
│   ├── components/
│   │   ├── ChecklistForm.vue    # チェックリスト入力フォーム
│   │   └── SignatureModal.vue   # 署名入力モーダル
│   ├── composables/
│   │   └── useRunId.js          # 実行ID生成ロジック
│   ├── stores/
│   │   └── db.js                # IndexedDB操作（idb使用）
│   ├── views/
│   │   ├── Home.vue             # チェック画面
│   │   ├── History.vue          # 履歴画面
│   │   ├── Settings.vue         # 設定画面（ネットワーク状態表示）
│   │   └── PrintSheet.vue       # 印刷画面
│   ├── App.vue                  # メインアプリ
│   ├── main.js                  # エントリーポイント
│   ├── router.js                # Vue Router設定
│   └── styles.css               # グローバルスタイル
├── dist/                        # ビルド出力（自動生成）
│   ├── sw.js                    # Workbox生成のService Worker
│   ├── workbox-xxx.js           # Workboxランタイム
│   ├── registerSW.js            # Service Worker登録スクリプト
│   ├── web.config               # IIS設定（自動コピー）
│   └── .htaccess                # Apache設定（自動コピー）
├── index.html                   # エントリーポイントHTML
├── vite.config.js               # Vite設定（Workbox設定含む）
├── package.json                 # 依存関係定義
├── deploy-to-iis.ps1            # IIS自動デプロイスクリプト
├── deploy-to-apache.sh          # Apache自動デプロイスクリプト
└── setup-https-iis.ps1          # HTTPS設定スクリプト
```

## 🛠️ セットアップ

### 必要要件

- Node.js（推奨: v18以上）
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

開発サーバーが起動し、ブラウザで `http://localhost:5173` にアクセスできます。

> **注意**: Service Workerは開発モードでは動作しません。オフライン機能をテストするには本番ビルドが必要です。

### ビルド

```bash
npm run build
```

本番用のビルドが `dist/` ディレクトリに生成されます。

### プレビュー

```bash
npm run preview
```

ビルドしたアプリケーションをローカルでプレビューできます。

## 📱 使い方

### 1. チェック画面

- **基本情報入力**: 作業者名と確認者名を入力
- **チェック項目**: 各項目をチェック
- **署名入力**: 作業者と確認者がそれぞれ署名
- **PDF生成**: すべて入力後、「PDF生成（印刷）」ボタンをクリック

### 2. 履歴画面

- 過去の作業記録を一覧表示
- **再印刷**: 過去の記録を再度印刷
- **削除**: 不要な記録を削除

### 3. 設定画面

- アプリケーションの設定やカスタマイズ

### 4. オフライン利用

1. **初回アクセス**: オンライン状態でアプリにアクセス
2. **自動キャッシュ**: アプリが自動的にキャッシュされる
3. **オフラインで使用**: ネットワークを切断してもアプリが動作
4. **データ保存**: 入力データはすべてローカルに保存

## 💾 データ保存

このアプリケーションは、すべてのデータをブラウザのIndexedDBに保存します。

- **executions**: チェック実行履歴とメタデータ
- **blobs**: 署名画像（Base64形式）
- **meta**: 実行ID採番用カウンター

データはブラウザ内に保存されるため、以下の点に注意してください：

- ⚠️ ブラウザのキャッシュクリアでデータが削除される可能性があります
- ⚠️ 異なるデバイス間でデータは同期されません
- ⚠️ 重要なデータは定期的にPDF出力することを推奨します

## 🚀 IISへの導入

### 前提条件

- Windows Server または Windows 10/11 Pro以上
- IIS（Internet Information Services）がインストール済み
- URL Rewriteモジュールがインストール済み

### 自動デプロイ（推奨）

PowerShellスクリプトを使用した簡単デプロイ：

```powershell
# PowerShellを管理者として実行
.\deploy-to-iis.ps1 -SiteName "WorkCheckPWA" -PhysicalPath "C:\inetpub\wwwroot\WorkCheckPWA" -Port 80
.\deploy-to-iis.ps1 -SiteName "WorkCheckPWAOffline" -PhysicalPath "C:\inetpub\wwwroot\WorkCheckPWAOffline" -Port 80
```

このスクリプトは以下を自動実行します：
- アプリケーションのビルド
- ファイルのコピー（**Service Worker含む**）
- IISサイトの作成/更新
- アプリケーションプールの設定

## 🐧 Apacheへの導入

### 自動デプロイ（推奨）

Bashスクリプトを使用した簡単デプロイ：

```bash
# スクリプトに実行権限を付与
chmod +x deploy-to-apache.sh

# デプロイ実行
./deploy-to-apache.sh /var/www/html/workcheck
```

## 🧪 オフライン機能のテスト

### 方法1: ブラウザの開発者ツール

1. アプリをビルドしてデプロイ
2. ブラウザでアクセス
3. F12で開発者ツールを開く
4. **Application** タブ → **Service Workers**
   - Service Workerが登録されているか確認
5. **Offline** にチェック
6. ページをリロード → オフラインでも動作するか確認

### 方法2: 実際にネットワークを切断

1. アプリにアクセス（オンライン時）
2. 画面上の「オンライン」バッジを確認
3. Wi-Fiを切断
4. 画面上に「オフライン」バッジが表示される
5. ページをリロード → アプリが起動する
6. すべての機能が動作するか確認

## 🖨️ 印刷・PDF出力

印刷機能は、ブラウザの標準印刷機能を使用します。

1. チェック完了後、自動的に印刷ダイアログが開きます
2. プリンター選択で「PDFに保存」を選択すると、PDFファイルとして保存できます
3. 履歴画面から過去のデータを再印刷することも可能です
4. **オフラインでも印刷可能**

## 🎨 カスタマイズ

### チェックリストテンプレートの編集

`src/assets/checklist.template.json` を編集することで、チェック項目をカスタマイズできます。

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
      "hasRemark": true,
      "remarkMaxLength": 50
    },
    {
      "id": "item3",
      "label": "作業手順を確認しましたか",
      "hasRemark": false
    }
  ]
}
```

#### 項目の設定項目

- `id`: 項目の一意ID
- `label`: 表示されるチェック項目名
- `hasRemark`: 備考欄の有無（true/false）
- `remarkMaxLength`: 備考欄の最大文字数（hasRemarkがtrueの場合のみ）

### Workboxの自動更新

Workboxを使用しているため、キャッシュバージョンは自動管理されます。

- **自動更新**: アプリを再ビルド・再デプロイすると、自動的に新しいキャッシュが生成されます
- **手動更新不要**: `CACHE_VERSION`の手動更新は不要です
- **ユーザー通知**: ネットワーク復帰時に自動で最新版をチェックし、ユーザーに更新を通知します

## 🔧 トラブルシューティング

### Service Workerが登録されない

- HTTPSまたはlocalhostで実行しているか確認
- ブラウザの開発者ツールでエラーを確認
- Service Workerがサポートされているブラウザか確認

### オフラインで動作しない

- 一度オンライン状態でアクセスしたか確認
- Service Workerが正常に登録されているか確認（開発者ツール）
- キャッシュが正しく保存されているか確認

### データが消える

- ブラウザのキャッシュをクリアしていないか確認
- プライベートモードで使用していないか確認
- 重要なデータはPDF出力を推奨

### 更新が反映されない

- ブラウザのキャッシュをクリア（Ctrl+Shift+R）
- Service Workerを手動で更新（開発者ツール → Service Workers → Update）
- アプリを再ビルド・再デプロイ（Workboxが自動でキャッシュバージョンを管理）

### iPhone/iPadで動作しない

- **HTTPS必須**: SafariでPWA機能を使用するにはHTTPSが必須
- **Safariブラウザ**: Chrome等ではPWAインストール不可
- **証明書警告**: 自己署名証明書の警告は正常（社内利用では問題なし）
- **同じWi-Fi**: PCとiPhone/iPadが同じWi-Fiネットワークに接続されている必要

### オフラインで白い画面が表示される

- 初回アクセス時にオンライン状態でアクセスしたか確認
- 約3-5秒待ってからオフラインテストを実行
- Service Workerが正常に登録されているか確認（開発者ツール）
- アプリを一度削除して、再度ホーム画面に追加

### データが消える

- ブラウザのキャッシュをクリアしていないか確認
- プライベートモードで使用していないか確認
- 重要なデータはPDF出力を推奨
- 異なるデバイス間でデータは同期されない

## 📊 オフライン対応レベルの比較

| 機能 | 通常版 | オフライン対応版 |
|------|--------|-----------------|
| PWAインストール | ✅ | ✅ |
| データ保存 | ✅ | ✅ |
| オフラインでアプリ起動 | ❌ | ✅ |
| オフラインでデータ入力 | ❌ | ✅ |
| オフラインでPDF生成 | ❌ | ✅ |
| 自動更新 | ❌ | ✅ |
| ネットワーク状態表示 | ❌ | ✅ |

## 📚 関連ドキュメント

### 初心者向け
- **[GETTING_STARTED.md](GETTING_STARTED.md)** - 5分でわかるWorkCheck PWA（初心者向けガイド）
- **[QUICK_START_MOBILE.md](QUICK_START_MOBILE.md)** - iPhone/iPadで使う（簡易版）

### モバイル利用
- **[MOBILE_GUIDE.md](MOBILE_GUIDE.md)** - iPhone/iPad利用ガイド（詳細版）
- **[setup-https-iis.ps1](setup-https-iis.ps1)** - HTTPS設定スクリプト

### 技術詳細
- **[SERVICE_WORKER_GUIDE.md](SERVICE_WORKER_GUIDE.md)** - Service Worker動作ガイド
- **[WORKBOX_IMPLEMENTATION.md](WORKBOX_IMPLEMENTATION.md)** - Workbox実装詳細
- **[FILE_GUIDE.md](FILE_GUIDE.md)** - 全ファイルの説明
- **[PROJECT_STRUCTURE.txt](PROJECT_STRUCTURE.txt)** - プロジェクト構成図

### デプロイ
- **[deploy-to-iis.ps1](deploy-to-iis.ps1)** - IIS自動デプロイスクリプト
- **[deploy-to-apache.sh](deploy-to-apache.sh)** - Apache自動デプロイスクリプト

## 📄 ライセンス

© 株式会社 サンプルテスト

## 🤝 開発者向け情報

### Service Workerのアーキテクチャ（Workbox版）

- **プリキャッシュ**: ビルド時に自動検出された全ファイル（JS, CSS, HTML, manifest, icon）
- **ランタイムキャッシュ**: 動的に取得されるリソース
- **キャッシュ戦略**: 
  - ページ: NetworkFirst（オンライン時は最新、オフライン時はキャッシュ）
  - JS/CSS: StaleWhileRevalidate（キャッシュを即座に返しつつ、バックグラウンドで更新）
  - 画像: CacheFirst（キャッシュ優先）
- **自動更新**: ネットワーク復帰時に最新版を自動チェック・更新

### 実行IDの生成ルール

実行IDは以下の形式で生成されます：
```
SMP-YYYYMMDD-NNN
```

- `SMP`: 固定プレフィックス（サンプルテスト）
- `YYYYMMDD`: 実行日（例: 20251015）
- `NNN`: 当日の連番（001, 002, ...）

**例**: `SMP-20251015-001`, `SMP-20251015-002`

実行IDはIndexedDBの`meta`ストアで管理され、日付ごとに独立したカウンターを持ちます。

### IndexedDBのスキーマバージョン

現在のバージョン: `1`

#### データベース構造

```javascript
// データベース名: WorkCheckDB
// バージョン: 1

// executions: チェック実行履歴
{
  id: "SMP-20251015-001",           // 実行ID
  timestamp: 1697364000000,         // 実行日時
  date: "20251015",                // 実行日
  operatorName: "山田 太郎",        // 作業者名
  checkerName: "佐藤 花子",         // 確認者名
  checklist: { ... },              // チェック結果
  createdAt: "2025-10-15T10:00:00Z"
}

// blobs: 署名画像データ
{
  id: "SMP-20251015-001_operator_signature",
  dataUrl: "data:image/png;base64,..."
}

// meta: メタデータ（実行ID採番用）
{
  key: "runCounter_20251015",
  value: 3  // 当日の連番
}
```

スキーマを変更する場合は、`src/stores/db.js` の `DB_VERSION` を更新してください。

### Workbox実装の詳細

このアプリケーションは**Google製Workbox**を使用してService Workerを実装しています。

#### 主な特徴
- **自動ファイル検出**: ビルド時に全ファイルを自動検出・プリキャッシュ
- **確実なオフライン動作**: JS/CSSを含む全リソースが事前キャッシュ
- **タイミング問題なし**: 待ち時間不要で即座にオフライン対応完了
- **自動更新**: ネットワーク復帰時に最新版を自動チェック・更新

#### キャッシュ戦略（vite.config.js設定）

```javascript
// ページ遷移: NetworkFirst
{
  urlPattern: ({ request }) => request.mode === 'navigate',
  handler: 'NetworkFirst',
  options: {
    cacheName: 'pages',
    expiration: { maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 }
  }
}

// JS/CSS: StaleWhileRevalidate  
{
  urlPattern: ({ request }) => 
    request.destination === 'script' || request.destination === 'style',
  handler: 'StaleWhileRevalidate',
  options: {
    cacheName: 'assets',
    expiration: { maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 }
  }
}

// 画像: CacheFirst
{
  urlPattern: ({ request }) => request.destination === 'image',
  handler: 'CacheFirst',
  options: {
    cacheName: 'images',
    expiration: { maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 }
  }
}
```

#### プリキャッシュされるファイル
- `assets/index-xxx.js` (JavaScript)
- `assets/index-xxx.css` (CSS)
- `index.html` (メインページ)
- `manifest.webmanifest` (PWAマニフェスト)
- `icons/icon.svg` (アプリアイコン)

詳細は [WORKBOX_IMPLEMENTATION.md](WORKBOX_IMPLEMENTATION.md) を参照してください。

---

開発: 株式会社 サンプルテスト  
バージョン: 0.3.0（オフライン対応版 - Workbox採用）

## 📝 変更履歴

### v0.3.0（2025-10-15）
- 🎉 **Workbox導入**: Google製の業界標準ツールでService Workerを完全再実装
- ✅ **100%確実なオフライン動作**: タスク削除後も安定動作
- ✅ **ビルド時の自動検出**: JS/CSSを含むすべてのファイルを自動プリキャッシュ
- ✅ **タイミング問題を完全解決**: 待ち時間不要、即座にオフライン対応完了
- ✅ **高度なキャッシュ戦略**: NetworkFirst/StaleWhileRevalidate/CacheFirst
- ✅ **自動更新**: ネットワーク復帰時に自動で最新版に更新
- ✅ **サーバー接続確認**: 設定画面で配信元サーバーへの接続状態を表示
- ✅ **UIの簡素化**: ヘッダーからステータス表示を削除、設定画面に集約

### v0.2.1（2025-10-15）
- Service Worker v2: 冗長キャッシュ戦略（問題あり）
- タスク削除後の再起動で白い画面になる問題が残る

### v0.2.0
- Service Worker実装
- 完全オフライン対応（不完全）

### v0.1.0
- 初期リリース
# WorkCheckSample
# WorkCheckSample
