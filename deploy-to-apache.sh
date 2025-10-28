#!/bin/bash
# WorkCheck PWA - Apache デプロイスクリプト
# 使用方法: ./deploy-to-apache.sh [配置先パス]

set -e

# カラー出力
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
GRAY='\033[0;37m'
NC='\033[0m' # No Color

# デフォルト設定
DEFAULT_TARGET_DIR="/var/www/html/workcheck"
TARGET_DIR="${1:-$DEFAULT_TARGET_DIR}"

echo -e "${CYAN}========================================"
echo -e "WorkCheck PWA - Apache デプロイスクリプト"
echo -e "========================================${NC}"
echo ""

# Node.jsの確認
echo -e "${GREEN}1. Node.jsの確認...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}エラー: Node.jsが見つかりません。${NC}"
    exit 1
fi
NODE_VERSION=$(node --version)
echo -e "${GRAY}   ✓ Node.js: $NODE_VERSION${NC}"

# npmの確認
if ! command -v npm &> /dev/null; then
    echo -e "${RED}エラー: npmが見つかりません。${NC}"
    exit 1
fi
echo ""

# ビルド実行
echo -e "${GREEN}2. アプリケーションのビルド...${NC}"
echo -e "${GRAY}   npm run build を実行中...${NC}"
npm run build
echo -e "${GRAY}   ✓ ビルド完了${NC}"

# distフォルダの確認
if [ ! -d "dist" ]; then
    echo -e "${RED}エラー: distフォルダが見つかりません。${NC}"
    exit 1
fi
echo ""

# 配置先ディレクトリの準備
echo -e "${GREEN}3. 配置先ディレクトリの準備...${NC}"
echo -e "${GRAY}   配置先: $TARGET_DIR${NC}"

# sudo権限の確認
if [ ! -w "$(dirname "$TARGET_DIR")" ] 2>/dev/null; then
    echo -e "${YELLOW}   管理者権限が必要です。sudoを使用します。${NC}"
    USE_SUDO="sudo"
else
    USE_SUDO=""
fi

# ディレクトリの作成
if [ ! -d "$TARGET_DIR" ]; then
    $USE_SUDO mkdir -p "$TARGET_DIR"
    echo -e "${GRAY}   ✓ ディレクトリを作成: $TARGET_DIR${NC}"
else
    echo -e "${GRAY}   既存のファイルを削除中...${NC}"
    $USE_SUDO rm -rf "$TARGET_DIR"/*
    echo -e "${GRAY}   ✓ 既存ファイル削除完了${NC}"
fi
echo ""

# ファイルのコピー
echo -e "${GREEN}4. ファイルのコピー...${NC}"
$USE_SUDO cp -r dist/* "$TARGET_DIR/"
echo -e "${GRAY}   ✓ ファイルコピー完了${NC}"
echo ""

# パーミッション設定
echo -e "${GREEN}5. パーミッション設定...${NC}"
$USE_SUDO chown -R www-data:www-data "$TARGET_DIR" 2>/dev/null || \
$USE_SUDO chown -R apache:apache "$TARGET_DIR" 2>/dev/null || \
$USE_SUDO chown -R nginx:nginx "$TARGET_DIR" 2>/dev/null || \
echo -e "${YELLOW}   ⚠ 所有者の変更をスキップ${NC}"

$USE_SUDO chmod -R 755 "$TARGET_DIR"
echo -e "${GRAY}   ✓ パーミッション設定完了${NC}"
echo ""

# Apacheの設定確認
echo -e "${GREEN}6. Apache設定の確認...${NC}"

# mod_rewriteの確認
if command -v apachectl &> /dev/null; then
    if apachectl -M 2>/dev/null | grep -q "rewrite_module"; then
        echo -e "${GRAY}   ✓ mod_rewriteが有効です${NC}"
    else
        echo -e "${YELLOW}   ⚠ mod_rewriteが有効ではありません${NC}"
        echo -e "${YELLOW}   以下のコマンドで有効化してください:${NC}"
        echo -e "${GRAY}   sudo a2enmod rewrite${NC}"
        echo -e "${GRAY}   sudo systemctl restart apache2${NC}"
    fi
else
    echo -e "${YELLOW}   ⚠ apachectlが見つかりません。手動で確認してください。${NC}"
fi
echo ""

# .htaccessの確認
echo -e "${GREEN}7. .htaccessの確認...${NC}"
if [ -f "$TARGET_DIR/.htaccess" ]; then
    echo -e "${GRAY}   ✓ .htaccessが存在します${NC}"
else
    echo -e "${RED}   エラー: .htaccessが見つかりません${NC}"
fi
echo ""

# 完了メッセージ
echo -e "${CYAN}========================================"
echo -e "${GREEN}デプロイ完了！${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""
echo -e "${NC}配置場所: ${CYAN}$TARGET_DIR${NC}"
echo ""
echo -e "${YELLOW}次のステップ:${NC}"
echo -e "${GRAY}  1. Apache設定でAllowOverride Allが設定されているか確認${NC}"
echo -e "${GRAY}  2. mod_rewriteが有効か確認${NC}"
echo -e "${GRAY}  3. ブラウザでアクセスして動作確認${NC}"
echo -e "${GRAY}  4. 必要に応じてSSL/HTTPS設定を行う${NC}"
echo ""
echo -e "${YELLOW}Apacheの設定例 (/etc/apache2/sites-available/workcheck.conf):${NC}"
echo -e "${GRAY}<VirtualHost *:80>${NC}"
echo -e "${GRAY}    ServerName workcheck.example.com${NC}"
echo -e "${GRAY}    DocumentRoot $TARGET_DIR${NC}"
echo -e "${GRAY}    <Directory $TARGET_DIR>${NC}"
echo -e "${GRAY}        Options Indexes FollowSymLinks${NC}"
echo -e "${GRAY}        AllowOverride All${NC}"
echo -e "${GRAY}        Require all granted${NC}"
echo -e "${GRAY}    </Directory>${NC}"
echo -e "${GRAY}</VirtualHost>${NC}"
echo ""

