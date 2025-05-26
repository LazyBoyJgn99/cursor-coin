# 加密工具使用说明

这个模块提供了将6位数字（000001-999999）加密为4位字母数字组合的功能。

## 🔐 功能特点

- **输入**: 6位数字字符串 (000001-999999)
- **输出**: 4位小写字母+数字组合 (如: `a1b2`, `xyz9`)
- **字符集**: 26个小写字母 + 10个数字 = 36个字符
- **唯一性**: 每个输入对应唯一的输出
- **可逆性**: 支持完整的加密和解密

## 📦 导入方式

```typescript
import { encryptToCode, decryptFromCode, generateEncryptionMap } from '@/utils/encryption';
```

## 🚀 基本使用

### 加密

```typescript
const encrypted = encryptToCode('000001');
console.log(encrypted); // 输出: xxxh
```

### 解密

```typescript
const decrypted = decryptFromCode('xxxh');
console.log(decrypted); // 输出: 000001
```

### 完整示例

```typescript
const originalNumber = '123456';
const encrypted = encryptToCode(originalNumber);
const decrypted = decryptFromCode(encrypted);

console.log(`${originalNumber} -> ${encrypted} -> ${decrypted}`);
// 输出: 123456 -> a1b2 -> 123456
```

## 🛠 API 参考

### `encryptToCode(sixDigitNumber: string): string`

将6位数字加密为4位字母数字组合。

**参数:**
- `sixDigitNumber`: 6位数字字符串，范围 000001-999999

**返回值:**
- 4位小写字母数字组合

**异常:**
- 输入不是6位数字时抛出错误
- 数字超出范围时抛出错误

### `decryptFromCode(code: string): string`

将4位字母数字组合解密为6位数字。

**参数:**
- `code`: 4位小写字母数字组合

**返回值:**
- 6位数字字符串

**异常:**
- 输入格式不正确时抛出错误
- 包含无效字符时抛出错误

### `generateEncryptionMap(start: number, end: number): Record<string, string>`

批量生成加密映射表。

**参数:**
- `start`: 起始数字 (默认: 1)
- `end`: 结束数字 (默认: 100)

**返回值:**
- 映射表对象，键为原始数字，值为加密结果

## 🎯 使用场景

### 1. URL短链接

```typescript
const baseUrl = 'https://your-domain.com';
const coinNumber = '000001';
const encrypted = encryptToCode(coinNumber);
const shortUrl = `${baseUrl}?code=${encrypted}`;
// 结果: https://your-domain.com?code=xxxh
```

### 2. 二维码生成

```typescript
import QRCode from 'qrcode';

const coinNumber = '000001';
const encrypted = encryptToCode(coinNumber);
const qrUrl = `https://your-domain.com?code=${encrypted}`;

QRCode.toDataURL(qrUrl, (err, url) => {
  // 生成包含加密码的二维码
});
```

### 3. 批量处理

```typescript
const coinNumbers = ['000001', '000100', '001000'];
const encryptedCodes = coinNumbers.map(num => ({
  original: num,
  encrypted: encryptToCode(num)
}));
```

## ⚠️ 注意事项

1. **输入验证**: 确保输入是有效的6位数字
2. **错误处理**: 使用try-catch处理可能的异常
3. **范围限制**: 只支持000001-999999范围的数字
4. **字符集**: 输出只包含小写字母和数字

## 🧪 测试示例

```typescript
// 基本测试
const testCases = ['000001', '000100', '001000', '010000', '100000', '999999'];

testCases.forEach(testCase => {
  try {
    const encrypted = encryptToCode(testCase);
    const decrypted = decryptFromCode(encrypted);
    const success = decrypted === testCase;
    
    console.log(`${testCase} -> ${encrypted} -> ${decrypted} [${success ? '✓' : '✗'}]`);
  } catch (error) {
    console.error(`测试失败 ${testCase}:`, error);
  }
});
```

## 🔧 算法说明

该加密算法使用以下步骤：

1. **输入验证**: 检查是否为有效的6位数字
2. **进制转换**: 将十进制数字转换为36进制
3. **置换加密**: 使用固定置换表对每位数字进行替换
4. **字符映射**: 将数字映射为字母数字字符

解密过程是加密的逆过程，确保完全可逆。 