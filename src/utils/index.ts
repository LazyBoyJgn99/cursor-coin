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
  // 1-100中随机10个
  7, 23, 34, 45, 56, 67, 78, 89, 91, 99,

  // 100-1000中随机10个
  123, 234, 345, 456, 567, 678, 789, 834, 912, 987,

  // 1000-10000中随机10个
  1234, 2345, 3456, 4567, 5678, 6789, 7890, 8234, 9123, 9876,

  // 10000+中随机10个
  12345, 23456, 34567, 45678, 56789, 67890, 78901, 82345, 91234, 98765,
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
