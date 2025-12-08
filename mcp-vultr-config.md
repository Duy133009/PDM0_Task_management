# Hướng dẫn cấu hình MCP Vultr để cập nhật n8n

## Cấu hình MCP Vultr trong Cursor

Để sử dụng MCP Vultr trong Cursor, bạn cần cấu hình trong file cấu hình MCP của Cursor.

### Bước 1: Tìm file cấu hình MCP

File cấu hình thường nằm tại:
- **Windows**: `%APPDATA%\Cursor\User\globalStorage\mcp.json` hoặc trong settings
- **macOS**: `~/Library/Application Support/Cursor/User/globalStorage/mcp.json`
- **Linux**: `~/.config/Cursor/User/globalStorage/mcp.json`

### Bước 2: Thêm cấu hình Vultr MCP

Thêm vào file cấu hình MCP:

```json
{
  "mcpServers": {
    "vultr": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-vultr"
      ],
      "env": {
        "VULTR_API_KEY": "your-vultr-api-key-here"
      }
    }
  }
}
```

### Bước 3: Lấy Vultr API Key

1. Đăng nhập vào [Vultr Control Panel](https://my.vultr.com/)
2. Vào **Settings** → **API**
3. Tạo API Key mới hoặc sử dụng key hiện có
4. Copy API Key và thay thế `your-vultr-api-key-here` trong cấu hình

### Bước 4: Khởi động lại Cursor

Sau khi cấu hình, khởi động lại Cursor để MCP Vultr được kích hoạt.

## Sử dụng script cập nhật n8n

Nếu bạn không muốn sử dụng MCP, bạn có thể:

1. **Upload script lên server Vultr**:
   ```bash
   scp update-n8n.sh user@your-vultr-ip:~/
   ```

2. **SSH vào server và chạy script**:
   ```bash
   ssh user@your-vultr-ip
   chmod +x update-n8n.sh
   ./update-n8n.sh
   ```

## Lưu ý

- Đảm bảo bạn có quyền sudo trên server Vultr
- Sao lưu dữ liệu n8n trước khi cập nhật
- Kiểm tra phiên bản Node.js tương thích (18.17.0 - 22.x)


