#!/bin/bash

# Script cập nhật n8n lên phiên bản mới nhất
# Sử dụng: chmod +x update-n8n.sh && ./update-n8n.sh

set -e

echo "🚀 Bắt đầu cập nhật n8n..."

# Kiểm tra Node.js version
echo "📦 Kiểm tra phiên bản Node.js..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ] || [ "$NODE_VERSION" -gt 22 ]; then
    echo "⚠️  Cảnh báo: n8n yêu cầu Node.js từ 18.17.0 đến 22.x"
    echo "   Phiên bản hiện tại: $(node -v)"
fi

# Sao lưu dữ liệu (nếu cần)
echo "💾 Đang sao lưu dữ liệu n8n..."
if [ -d "$HOME/.n8n" ]; then
    BACKUP_DIR="$HOME/n8n-backup-$(date +%Y%m%d-%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    cp -r "$HOME/.n8n" "$BACKUP_DIR/" 2>/dev/null || echo "⚠️  Không thể sao lưu .n8n directory"
    echo "✅ Đã sao lưu vào: $BACKUP_DIR"
fi

# Dừng dịch vụ n8n nếu đang chạy
echo "🛑 Dừng dịch vụ n8n..."
if systemctl is-active --quiet n8n; then
    sudo systemctl stop n8n
    echo "✅ Đã dừng dịch vụ n8n"
elif pgrep -f n8n > /dev/null; then
    pkill -f n8n
    echo "✅ Đã dừng process n8n"
else
    echo "ℹ️  n8n không đang chạy"
fi

# Cập nhật n8n lên phiên bản mới nhất
echo "⬆️  Đang cập nhật n8n..."
if command -v npm &> /dev/null; then
    # Nếu cài đặt global qua npm
    if npm list -g n8n &> /dev/null; then
        echo "📦 Cập nhật n8n qua npm..."
        sudo npm install -g n8n@latest
    else
        echo "📦 Cài đặt n8n mới nhất qua npm..."
        sudo npm install -g n8n@latest
    fi
elif command -v npx &> /dev/null; then
    echo "📦 Sử dụng npx để cập nhật n8n..."
    sudo npx -y n8n@latest --version
else
    echo "❌ Không tìm thấy npm hoặc npx. Vui lòng cài đặt Node.js trước."
    exit 1
fi

# Kiểm tra phiên bản mới
echo "✅ Kiểm tra phiên bản n8n mới..."
n8n --version || npx n8n --version

# Khởi động lại dịch vụ n8n
echo "🔄 Khởi động lại dịch vụ n8n..."
if [ -f /etc/systemd/system/n8n.service ]; then
    sudo systemctl daemon-reload
    sudo systemctl start n8n
    sudo systemctl enable n8n
    echo "✅ Đã khởi động lại dịch vụ n8n"
    echo "📊 Kiểm tra trạng thái: sudo systemctl status n8n"
else
    echo "ℹ️  Không tìm thấy systemd service. Bạn có thể khởi động n8n thủ công:"
    echo "   n8n start"
fi

echo ""
echo "🎉 Hoàn tất! n8n đã được cập nhật lên phiên bản mới nhất."
echo "📝 Lưu ý: Nếu gặp vấn đề, bạn có thể khôi phục từ backup tại: $BACKUP_DIR"


