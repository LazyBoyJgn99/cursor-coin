# URL 加密密钥使用示例

## 🔄 新旧格式对比

### 旧格式（明文）
```
https://your-domain.com?key=000001
https://your-domain.com?key=000100
https://your-domain.com?key=001000
```

### 新格式（加密）
```
https://your-domain.com?key=xxxh
https://your-domain.com?key=xx56
https://your-domain.com?key=xxs6
```

## 📱 实际使用示例

### 1. 生成加密URL

```typescript
import { generateEncryptedUrl, getEncryptedKey } from '@/utils';

// 方法1：直接生成完整URL
const url1 = generateEncryptedUrl('000001');
// 结果: https://your-domain.com?key=xxxh

// 方法2：只获取加密码
const encryptedKey = getEncryptedKey('000001');
const url2 = `https://your-domain.com?key=${encryptedKey}`;
// 结果: https://your-domain.com?key=xxxh
```

### 2. 解析URL中的密钥

```typescript
import { getCoinKeyFromUrl } from '@/utils';

// 当前URL: https://your-domain.com?key=xxxh
const coinKey = getCoinKeyFromUrl();
console.log(coinKey); // 输出: "000001"

// 当前URL: https://your-domain.com?key=000001 (旧格式，兼容)
const coinKey2 = getCoinKeyFromUrl();
console.log(coinKey2); // 输出: "000001" (带警告)
```

### 3. 二维码生成

```typescript
import QRCode from 'qrcode';
import { generateEncryptedUrl } from '@/utils';

async function generateQRCode(coinNumber: string) {
  const encryptedUrl = generateEncryptedUrl(coinNumber);
  const qrDataUrl = await QRCode.toDataURL(encryptedUrl);
  return qrDataUrl;
}

// 使用示例
generateQRCode('000001').then(qrCode => {
  // qrCode 包含二维码图片的 data URL
  // 扫描后访问: https://your-domain.com?key=xxxh
});
```

### 4. 批量URL生成

```typescript
import { getEncryptedKey } from '@/utils';

const coinNumbers = ['000001', '000100', '001000', '010000', '100000'];
const baseUrl = 'https://your-domain.com';

const urls = coinNumbers.map(num => ({
  original: num,
  encrypted: getEncryptedKey(num),
  url: `${baseUrl}?key=${getEncryptedKey(num)}`
}));

console.log(urls);
// 输出:
// [
//   { original: '000001', encrypted: 'xxxh', url: 'https://your-domain.com?key=xxxh' },
//   { original: '000100', encrypted: 'xx56', url: 'https://your-domain.com?key=xx56' },
//   ...
// ]
```

## 🔧 错误处理

```typescript
import { getCoinKeyFromUrl } from '@/utils';

function handleCoinDisplay() {
  const coinKey = getCoinKeyFromUrl();
  
  if (!coinKey) {
    // 处理无效的URL参数
    console.error('无效的密钥参数');
    // 显示错误页面或重定向
    return;
  }
  
  // 继续正常的业务逻辑
  console.log(`显示纪念币: ${coinKey}`);
}
```

## 📊 映射表对照

| 原始数字 | 加密码 | 新URL示例 |
|---------|--------|-----------|
| 000001  | xxxh   | `?key=xxxh` |
| 000100  | xx56   | `?key=xx56` |
| 001000  | xxs6   | `?key=xxs6` |
| 010000  | x8w6   | `?key=x8w6` |
| 100000  | 5226   | `?key=5226` |

## ⚠️ 注意事项

1. **向后兼容**: 系统仍支持旧格式的明文密钥，但会显示警告
2. **大小写敏感**: 加密码只包含小写字母和数字
3. **长度固定**: 加密码固定为4位字符
4. **唯一性**: 每个6位数字对应唯一的4位加密码

## 🚀 迁移建议

1. **渐进式迁移**: 先部署支持新格式的代码，保持向后兼容
2. **批量更新**: 使用脚本批量更新现有的URL和二维码
3. **监控日志**: 观察旧格式的使用情况，逐步淘汰
4. **用户通知**: 通知用户更新保存的链接 