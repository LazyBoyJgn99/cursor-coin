// 加密功能使用示例

import { encryptToCode, decryptFromCode, generateEncryptionMap } from './encryption';

/**
 * 基本使用示例
 */
export function basicExample() {
  console.log('=== 基本加密解密示例 ===');
  
  // 加密示例
  const originalNumber = '000001';
  const encrypted = encryptToCode(originalNumber);
  const decrypted = decryptFromCode(encrypted);
  
  console.log(`原始数字: ${originalNumber}`);
  console.log(`加密结果: ${encrypted}`);
  console.log(`解密结果: ${decrypted}`);
  console.log(`验证成功: ${originalNumber === decrypted ? '✓' : '✗'}`);
}

/**
 * 批量处理示例
 */
export function batchExample() {
  console.log('\n=== 批量处理示例 ===');
  
  const numbers = ['000001', '000100', '001000', '010000', '100000'];
  
  numbers.forEach(num => {
    const encrypted = encryptToCode(num);
    console.log(`${num} -> ${encrypted}`);
  });
}

/**
 * URL生成示例
 */
export function urlExample() {
  console.log('\n=== URL生成示例 ===');
  
  const baseUrl = 'https://your-domain.com';
  const numbers = ['000001', '000100', '001000'];
  
  numbers.forEach(num => {
    const encrypted = encryptToCode(num);
    const url = `${baseUrl}?code=${encrypted}`;
    console.log(`纪念币 ${num}: ${url}`);
  });
}

/**
 * 映射表生成示例
 */
export function mappingExample() {
  console.log('\n=== 映射表生成示例 ===');
  
  const map = generateEncryptionMap(1, 10);
  
  console.log('前10个纪念币的加密映射:');
  Object.entries(map).forEach(([original, encrypted]) => {
    console.log(`${original} -> ${encrypted}`);
  });
}

/**
 * 错误处理示例
 */
export function errorHandlingExample() {
  console.log('\n=== 错误处理示例 ===');
  
  const invalidInputs = ['12345', '1234567', 'abcdef', '000000'];
  
  invalidInputs.forEach(input => {
    try {
      const encrypted = encryptToCode(input);
      console.log(`${input} -> ${encrypted}`);
    } catch (error) {
      console.log(`${input} -> 错误: ${(error as Error).message}`);
    }
  });
}

// 如果直接运行此文件，执行所有示例
if (require.main === module) {
  basicExample();
  batchExample();
  urlExample();
  mappingExample();
  errorHandlingExample();
} 