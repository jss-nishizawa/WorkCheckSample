# 📱 iPhone/iPad (Safari) 利用ガイド

WorkCheck PWA をiPhone/iPadのSafariでオフライン利用する方法を説明します。

## 🔧 事前準備（PCで実施）

### 1. アプリをIISにデプロイ

```powershell
# PowerShellを管理者として実行
cd C:\!Project\!Apps\WorkCheckPWAOffline

# アプリをデプロイ
.\deploy-to-iis.ps1 -SiteName "WorkCheckPWAOffline" -Port 80
```

### 2. HTTPS（SSL）を設定

**重要**: SafariでPWA機能を使用するには**HTTPSが必須**です。

```powershell
# PowerShellを管理者として実行
.\setup-https-iis.ps1
```

このスクリプトは以下を実行します：
- 自己署名証明書の作成
- IISへのHTTPSバインディング設定
- アクセス用のIPアドレス表示

実行後、以下のような情報が表示されます：

```
Access URLs:
  HTTPS: https://localhost:443/
  HTTPS: https://YOUR-PC-NAME:443/
  HTTPS: https://192.168.1.100:443/
```

> **💡 ヒント**: `192.168.1.XXX` のようなIPアドレスをメモしてください。

### 3. Windowsファイアウォールの設定

iPhone/iPadからアクセスできるようにファイアウォールを設定します。

```powershell
# PowerShellを管理者として実行
# HTTPS (443ポート)を開放
New-NetFirewallRule -DisplayName "WorkCheck PWA HTTPS" -Direction Inbound -Protocol TCP -LocalPort 443 -Action Allow

# HTTP (80ポート)も開放する場合
New-NetFirewallRule -DisplayName "WorkCheck PWA HTTP" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow
```

---

## 📱 iPhone/iPadでの設定手順

### ステップ1: 同じWi-Fiネットワークに接続

PCとiPhone/iPadを**同じWi-Fiネットワーク**に接続します。

### ステップ2: Safariでアクセス

1. iPhone/iPadで **Safari** を開く
2. アドレスバーに入力:
   ```
   https://192.168.1.XXX/
   ```
   （XXXは前のステップで確認したIPアドレス）

### ステップ3: 証明書の警告を承認

初回アクセス時、セキュリティ警告が表示されます。

1. **「このWebサイトは安全ではありません」** という警告が表示される
2. **「詳細を表示」** をタップ
3. **「このWebサイトにアクセス」** をタップ

> **💡 なぜ警告が出るのか？**  
> 自己署名証明書を使用しているためです。社内利用では問題ありません。

### ステップ4: ホーム画面に追加（PWAインストール）

1. 画面下部の **共有ボタン** ![share icon](📤) をタップ
2. **「ホーム画面に追加」** を選択
3. アプリ名を確認（または変更）
4. **「追加」** をタップ

### ステップ5: アプリとして起動

1. ホーム画面に追加されたアイコンをタップ
2. アプリが全画面で起動
3. 画面上部に **「オンライン」** バッジが表示される

### ステップ6: オフライン動作の確認

1. **機内モード**をONにする、またはWi-Fiを切断
2. ホーム画面からアプリを起動
3. 画面上部に **「オフライン」** バッジが表示される
4. すべての機能が動作することを確認：
   - チェックリスト入力 ✅
   - 署名機能 ✅
   - PDF生成・印刷 ✅
   - 履歴表示 ✅

---

## 🎯 使用シーン

### 現場での利用例

1. **事前準備**（オンライン時）
   - オフィスのWi-Fiでアプリにアクセス
   - ホーム画面に追加
   - アプリが自動的にキャッシュされる

2. **現場での作業**（オフライン）
   - ネットワークがない現場でもアプリが起動
   - チェックリストを記入
   - 署名を取得
   - その場でPDF生成

3. **オフィスに戻って**（オンライン）
   - Wi-Fiに再接続
   - アプリが自動的に最新版に更新
   - データはそのまま保持

---

## 🔄 アプリの更新

アプリに新機能が追加された場合：

1. iPhone/iPadをWi-Fiに接続
2. アプリを起動
3. 「新しいバージョンが利用可能です。更新しますか？」と表示される
4. **「OK」** をタップ
5. アプリが自動的に更新される

---

## ⚠️ 注意事項

### Safariでの制限

- **必ずHTTPSでアクセス** してください（HTTPでは動作しません）
- **Safariブラウザから** ホーム画面に追加してください（Chrome等では不可）
- 初回アクセス時に証明書警告が出ますが、正常です

### データの保存

- データはiPhone/iPad内に保存されます
- アプリを削除するとデータも消えます
- 重要なデータはPDF出力を推奨

### ネットワークについて

- PCとiPhone/iPadが同じWi-Fiネットワークに接続されている必要があります
- 初回アクセス時のみネットワークが必要
- 以降はオフラインで完全動作

---

## 🛠️ トラブルシューティング

### アクセスできない

**原因1: ファイアウォール**
```powershell
# PowerShellで確認
Get-NetFirewallRule -DisplayName "WorkCheck PWA HTTPS"
```

**原因2: 異なるネットワーク**
- PCとiPhone/iPadが同じWi-Fiに接続されているか確認

**原因3: IPアドレスが変わった**
```powershell
# PowerShellで現在のIPを確認
Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike "127.*" }
```

### ホーム画面に追加できない

- HTTPSでアクセスしているか確認（URLが `https://` から始まる）
- Safariブラウザを使用しているか確認
- iOS 11.3以降であるか確認

### オフラインで動作しない

1. 一度オンライン状態でアクセスしたか確認
2. Safariの開発者コンソールでService Workerを確認
3. アプリを一度削除して、再度追加

### 証明書エラーが消えない

1. Safariの設定 → 詳細 → Webサイトデータ → すべて削除
2. iPhoneを再起動
3. 再度HTTPSでアクセス

---

## 📞 サポート

問題が解決しない場合は、以下を確認してください：

1. **PC側**
   - IISが起動しているか
   - HTTPSバインディングが設定されているか
   - ファイアウォールで443ポートが開いているか

2. **iPhone/iPad側**
   - iOS 11.3以降か
   - 同じWi-Fiネットワークに接続されているか
   - Safariブラウザを使用しているか

3. **ネットワーク**
   - Wi-Fiルーターで端末間通信が許可されているか
   - VPNなど特殊なネットワーク設定がないか

---

## 💡 ヒント

### IPアドレスの代わりにホスト名を使用

PCの名前でアクセスすることもできます：

```
https://YOUR-PC-NAME.local/
```

ただし、`.local` が動作しない場合は、IPアドレスを使用してください。

### QRコードで簡単アクセス

PCでQRコードを生成してiPhoneでスキャンすると便利です：

1. https://www.qr-code-generator.com/ にアクセス
2. `https://192.168.1.XXX/` を入力
3. 生成されたQRコードをiPhoneのカメラでスキャン

---

これで、iPhone/iPadでオフライン対応の作業確認アプリが使用できます！🎉

