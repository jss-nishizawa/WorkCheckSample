# 📱 クイックスタート: iPhone/iPad で使う

## PC側の準備（1回だけ）

### 1. アプリをデプロイ

```powershell
# PowerShellを管理者として実行
.\deploy-to-iis.ps1
```

### 2. HTTPSを設定

```powershell
# PowerShellを管理者として実行
.\setup-https-iis.ps1
```

実行後、表示されるIPアドレスをメモ：
```
例: https://192.168.1.100/
```

### 3. ファイアウォール設定

```powershell
# PowerShellを管理者として実行
New-NetFirewallRule -DisplayName "WorkCheck HTTPS" -Direction Inbound -Protocol TCP -LocalPort 443 -Action Allow
```

---

## iPhone/iPad側の設定

### 1. 同じWi-Fiに接続

PC と iPhone/iPad を同じWi-Fiネットワークに接続

### 2. Safariでアクセス

Safari で `https://192.168.1.XXX/` を開く
（XXXは前のステップでメモしたIPアドレス）

### 3. 証明書警告を承認

- 「詳細を表示」をタップ
- 「このWebサイトにアクセス」をタップ

### 4. ホーム画面に追加

- 共有ボタン（📤）をタップ
- 「ホーム画面に追加」を選択
- 「追加」をタップ

### 5. オフラインで使う

- ホーム画面のアイコンからアプリを起動
- **すぐにオフラインで使えます！**（待ち時間不要）
- Wi-Fiを切断しても動作します！
- タスクから削除しても再起動可能！

---

## ✅ 完了！

これで、ネットワークがない現場でも作業確認アプリが使えます。

詳しい手順は `MOBILE_GUIDE.md` を参照してください。

