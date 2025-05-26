import { decryptFromCode, encryptToCode } from './encryption';

// 从URL中获取加密密钥并解密为6位数字
export const getCoinKeyFromUrl = (): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  const key = urlParams.get('key');

  if (!key) {
    return null;
  }

  // 检查是否为4位字母数字组合（新的加密格式）
  if (/^[a-z0-9]{4}$/.test(key)) {
    try {
      // 解密4位加密码为6位数字
      const decryptedKey = decryptFromCode(key);
      return decryptedKey;
    } catch (error) {
      console.error('解密失败:', error);
      return null;
    }
  }

  // 兼容旧格式：6位数字（可选，用于过渡期）
  if (/^\d{6}$/.test(key)) {
    console.warn('检测到旧格式的明文密钥，建议使用加密格式');
    return key;
  }

  // 格式不正确
  console.error('密钥格式不正确，应为4位字母数字组合');
  return null;
};

// 格式化纪念币序号为 No.000001 格式
export const formatCoinNumber = (number: string): string => {
  return `No.${number.padStart(6, '0')}`;
};

// 固定的传奇稀有度映射表
const LEGENDARY_COINS = new Set([
  7, 13, 19, 23, 29, 34, 37, 41, 45, 52, 56, 61, 67, 73, 78, 83, 89, 91, 95, 99,
  123, 156, 189, 234, 267, 298, 345, 378, 412, 456, 489, 523, 567, 612, 678, 734, 789, 834, 912, 987,
  1234, 1567, 1890, 2345, 2678, 2987, 3456, 3789, 4123, 4567, 4890, 5234, 5678, 6123, 6789, 7345, 7890, 8234, 9123, 9876,
  12345, 15678, 18901, 23456, 26789, 29876, 34567, 37890, 41234, 45678, 48901, 52345, 56789, 61234, 67890, 73456, 78901, 82345, 91234, 98765,
  123456, 156789, 189012, 234567, 267890, 298765, 345678, 378901, 412345, 456789, 489012, 523456, 567890, 612345, 678901, 734567, 789012, 823456, 912345, 987654
]);

// 生成纪念币数据
export interface CoinData {
  id: string;
  serialNumber: string;
  name: string;
  description: string;
  rarity: 'common' | 'legendary';
  image?: string;
}

export const generateCoinData = (key: string): CoinData => {
  const serialNumber = formatCoinNumber(key);
  const keyNum = parseInt(key);

  // 检查是否为传奇稀有度
  const isLegendary = LEGENDARY_COINS.has(keyNum);

  let rarity: CoinData['rarity'] = isLegendary ? 'legendary' : 'common';
  let name = 'Cursor 纪念币';
  let description = '感谢您使用 Cursor AI 代码编辑器';

  // 根据稀有度设置名称和描述
  if (isLegendary) {
    name = 'Cursor 传奇纪念币';
    description = '见证 Cursor 的辉煌时刻，这是您专属的纪念币';
  } else {
    name = 'Cursor 纪念币';
    description = '感谢您使用 Cursor AI 代码编辑器，这是您专属的纪念币';
  }

  return {
    id: key,
    serialNumber,
    name,
    description,
    rarity,
  };
};

// 生成包含加密密钥的URL
export const generateEncryptedUrl = (sixDigitNumber: string, baseUrl: string = window.location.origin): string => {
  try {
    const encryptedKey = encryptToCode(sixDigitNumber);
    return `${baseUrl}?key=${encryptedKey}`;
  } catch (error) {
    console.error('生成加密URL失败:', error);
    throw error;
  }
};

// 从6位数字获取对应的加密码
export const getEncryptedKey = (sixDigitNumber: string): string => {
  try {
    return encryptToCode(sixDigitNumber);
  } catch (error) {
    console.error('获取加密码失败:', error);
    throw error;
  }
};

// 导出加密功能
export { encryptToCode, generateEncryptionMap, testEncryption } from './encryption';
