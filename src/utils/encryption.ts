// 简单的6位数字到4位字母数字的加密算法

// 字符集：26个小写字母 + 10个数字 = 36个字符
const CHARSET = 'abcdefghijklmnopqrstuvwxyz0123456789';
const BASE = CHARSET.length; // 36

// 固定的置换表，用于增加随机性
const PERMUTATION = [
  23, 7, 31, 15, 2, 28, 11, 34, 19, 6,
  25, 13, 30, 8, 21, 35, 4, 17, 29, 12,
  1, 26, 14, 33, 9, 22, 5, 18, 32, 16,
  3, 27, 10, 24, 0, 20
];

// 反向置换表
const REVERSE_PERMUTATION = new Array(36);
for (let i = 0; i < PERMUTATION.length; i++) {
  REVERSE_PERMUTATION[PERMUTATION[i]] = i;
}

/**
 * 将6位数字加密为4位字母数字组合
 * @param sixDigitNumber 6位数字字符串 (000001-999999)
 * @returns 4位字母数字组合
 */
export function encryptToCode(sixDigitNumber: string): string {
  // 验证输入
  if (!/^\d{6}$/.test(sixDigitNumber)) {
    throw new Error('输入必须是6位数字');
  }

  const num = parseInt(sixDigitNumber);
  if (num < 1 || num > 999999) {
    throw new Error('数字必须在000001-999999范围内');
  }

  // 将数字转换为36进制，然后应用置换
  let temp = num;
  let digits: number[] = [];

  // 转换为36进制，确保至少4位
  for (let i = 0; i < 4; i++) {
    digits.unshift(temp % BASE);
    temp = Math.floor(temp / BASE);
  }

  // 如果还有剩余，需要处理溢出
  if (temp > 0) {
    // 对于大数字，使用模运算压缩到4位
    const compressed = num % (BASE * BASE * BASE * BASE);
    temp = compressed;
    digits = [];
    for (let i = 0; i < 4; i++) {
      digits.unshift(temp % BASE);
      temp = Math.floor(temp / BASE);
    }
  }

  // 应用置换
  const permutedDigits = digits.map(digit => PERMUTATION[digit]);

  // 转换为字符
  return permutedDigits.map(digit => CHARSET[digit]).join('');
}

/**
 * 将4位字母数字组合解密为6位数字
 * @param code 4位字母数字组合
 * @returns 6位数字字符串
 */
export function decryptFromCode(code: string): string {
  // 验证输入
  if (!/^[a-z0-9]{4}$/.test(code)) {
    throw new Error('输入必须是4位小写字母和数字组合');
  }

  // 转换字符为数字
  const digits = code.split('').map(char => {
    const index = CHARSET.indexOf(char);
    if (index === -1) {
      throw new Error('包含无效字符');
    }
    return index;
  });

  // 应用反向置换
  const originalDigits = digits.map(digit => REVERSE_PERMUTATION[digit]);

  // 转换回十进制
  let result = 0;
  for (let i = 0; i < originalDigits.length; i++) {
    result = result * BASE + originalDigits[i];
  }

  // 如果结果为0或超出范围，需要特殊处理
  if (result === 0) {
    result = 1000000; // 映射到一个有效值
  }

  // 确保在有效范围内
  if (result > 999999) {
    result = result % 999999 + 1;
  }

  return result.toString().padStart(6, '0');
}

/**
 * 批量生成加密映射表（用于测试）
 * @param start 起始数字
 * @param end 结束数字
 * @returns 映射表对象
 */
export function generateEncryptionMap(start: number = 1, end: number = 100): Record<string, string> {
  const map: Record<string, string> = {};
  
  for (let i = start; i <= end; i++) {
    const sixDigit = i.toString().padStart(6, '0');
    const encrypted = encryptToCode(sixDigit);
    map[sixDigit] = encrypted;
  }
  
  return map;
}

/**
 * 测试加密解密功能
 */
export function testEncryption(): void {
  console.log('=== 加密解密测试 ===');
  
  const testCases = ['000001', '000100', '001000', '010000', '100000', '999999'];
  
  testCases.forEach(testCase => {
    try {
      const encrypted = encryptToCode(testCase);
      const decrypted = decryptFromCode(encrypted);
      
      console.log(`${testCase} -> ${encrypted} -> ${decrypted}`);
    } catch (error) {
      console.error(`测试失败 ${testCase}:`, error);
    }
  });
  
  console.log('=== 测试完成 ===');
} 