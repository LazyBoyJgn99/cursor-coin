import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CoinData } from '../utils';

interface Coin3DProps {
  coinData: CoinData;
}

const Coin3D: React.FC<Coin3DProps> = ({ coinData }) => {
  console.log('Coin3D received data:', coinData); // 调试信息
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // 根据稀有度设置颜色
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return '#FFD700'; // 金色
      default:
        return '#C0C0C0'; // 银色
    }
  };

  const coinColor = getRarityColor(coinData.rarity);

  // 旋转和悬浮动画
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  // 创建"Cursor"文字
  const createCursorText = () => {
    const textGroup = new THREE.Group();
    
    // 先只创建字母 C 来测试
    // 使用更简单的方法：用多个小方块组成字母
    const createLetterC = () => {
      const letterGroup = new THREE.Group();
      const boxMaterial = new THREE.MeshStandardMaterial({ 
        color: '#FFFFFF', // 改为白色，更明显
        metalness: 0.8, 
        roughness: 0.2,
        emissive: '#FFFFFF',
        emissiveIntensity: 0.1
      });
      
      // C字母的组成部分
      const blockSize = 0.1;
      const positions = [
        // 左竖线
        [-0.2, 0.3, 0], [-0.2, 0.2, 0], [-0.2, 0.1, 0], [-0.2, 0, 0], 
        [-0.2, -0.1, 0], [-0.2, -0.2, 0], [-0.2, -0.3, 0],
        // 上横线
        [-0.1, 0.3, 0], [0, 0.3, 0], [0.1, 0.3, 0],
        // 下横线
        [-0.1, -0.3, 0], [0, -0.3, 0], [0.1, -0.3, 0]
      ];
      
      positions.forEach(pos => {
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(blockSize, blockSize, blockSize),
          boxMaterial
        );
        box.position.set(pos[0], pos[1], pos[2]);
        letterGroup.add(box);
      });
      
      return letterGroup;
    };

    // 创建字母U
    const createLetterU = () => {
      const letterGroup = new THREE.Group();
      const boxMaterial = new THREE.MeshStandardMaterial({ 
        color: '#FFFFFF',
        metalness: 0.8, 
        roughness: 0.2,
        emissive: '#FFFFFF',
        emissiveIntensity: 0.1
      });
      
      // U字母的组成部分
      const blockSize = 0.1;
      const positions = [
        // 左竖线
        [-0.2, 0.3, 0], [-0.2, 0.2, 0], [-0.2, 0.1, 0], [-0.2, 0, 0], [-0.2, -0.1, 0],
        // 右竖线
        [0.2, 0.3, 0], [0.2, 0.2, 0], [0.2, 0.1, 0], [0.2, 0, 0], [0.2, -0.1, 0],
        // 底部横线
        [-0.1, -0.2, 0], [0, -0.2, 0], [0.1, -0.2, 0],
        // 底部圆角
        [-0.1, -0.3, 0], [0, -0.3, 0], [0.1, -0.3, 0]
      ];
      
      positions.forEach(pos => {
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(blockSize, blockSize, blockSize),
          boxMaterial
        );
        box.position.set(pos[0], pos[1], pos[2]);
        letterGroup.add(box);
      });
      
      return letterGroup;
    };

    // 创建字母R
    const createLetterR = () => {
      const letterGroup = new THREE.Group();
      const boxMaterial = new THREE.MeshStandardMaterial({ 
        color: '#FFFFFF',
        metalness: 0.8, 
        roughness: 0.2,
        emissive: '#FFFFFF',
        emissiveIntensity: 0.1
      });
      
      // R字母的组成部分
      const blockSize = 0.1;
      const positions = [
        // 左竖线
        [-0.2, 0.3, 0], [-0.2, 0.2, 0], [-0.2, 0.1, 0], [-0.2, 0, 0], 
        [-0.2, -0.1, 0], [-0.2, -0.2, 0], [-0.2, -0.3, 0],
        // 上横线
        [-0.1, 0.3, 0], [0, 0.3, 0], [0.1, 0.3, 0],
        // 中间横线
        [-0.1, 0, 0], [0, 0, 0], [0.1, 0, 0],
        // 右上竖线
        [0.2, 0.3, 0], [0.2, 0.2, 0], [0.2, 0.1, 0],
        // 斜线（R的腿）
        [-0.1, -0.1, 0], [0, -0.2, 0], [0.1, -0.3, 0]
      ];
      
      positions.forEach(pos => {
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(blockSize, blockSize, blockSize),
          boxMaterial
        );
        box.position.set(pos[0], pos[1], pos[2]);
        letterGroup.add(box);
      });
      
      return letterGroup;
    };

    // 创建字母S
    const createLetterS = () => {
      const letterGroup = new THREE.Group();
      const boxMaterial = new THREE.MeshStandardMaterial({ 
        color: '#FFFFFF',
        metalness: 0.8, 
        roughness: 0.2,
        emissive: '#FFFFFF',
        emissiveIntensity: 0.1
      });
      
      // S字母的组成部分
      const blockSize = 0.1;
      const positions = [
        // 上横线
        [-0.1, 0.3, 0], [0, 0.3, 0], [0.1, 0.3, 0], [0.2, 0.3, 0],
        // 左上竖线
        [-0.2, 0.2, 0], [-0.2, 0.1, 0],
        // 中间横线
        [-0.1, 0, 0], [0, 0, 0], [0.1, 0, 0],
        // 右下竖线
        [0.2, -0.1, 0], [0.2, -0.2, 0],
        // 下横线
        [-0.2, -0.3, 0], [-0.1, -0.3, 0], [0, -0.3, 0], [0.1, -0.3, 0]
      ];
      
      positions.forEach(pos => {
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(blockSize, blockSize, blockSize),
          boxMaterial
        );
        box.position.set(pos[0], pos[1], pos[2]);
        letterGroup.add(box);
      });
      
      return letterGroup;
    };

    // 创建字母O
    const createLetterO = () => {
      const letterGroup = new THREE.Group();
      const boxMaterial = new THREE.MeshStandardMaterial({ 
        color: '#FFFFFF',
        metalness: 0.8, 
        roughness: 0.2,
        emissive: '#FFFFFF',
        emissiveIntensity: 0.1
      });
      
      // O字母的组成部分
      const blockSize = 0.1;
      const positions = [
        // 上横线
        [-0.1, 0.3, 0], [0, 0.3, 0], [0.1, 0.3, 0],
        // 左竖线
        [-0.2, 0.2, 0], [-0.2, 0.1, 0], [-0.2, 0, 0], [-0.2, -0.1, 0], [-0.2, -0.2, 0],
        // 右竖线
        [0.2, 0.2, 0], [0.2, 0.1, 0], [0.2, 0, 0], [0.2, -0.1, 0], [0.2, -0.2, 0],
        // 下横线
        [-0.1, -0.3, 0], [0, -0.3, 0], [0.1, -0.3, 0]
      ];
      
      positions.forEach(pos => {
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(blockSize, blockSize, blockSize),
          boxMaterial
        );
        box.position.set(pos[0], pos[1], pos[2]);
        letterGroup.add(box);
      });
      
      return letterGroup;
    };
    
    // 添加字母C到文字组
    const letterC = createLetterC();
    letterC.position.set(0, -1.5, 0); // C调整位置
    letterC.rotation.y = Math.PI / 2; // 水平旋转90度
    letterC.rotation.z = Math.PI / 2; // 再旋转90度
    textGroup.add(letterC);

    // 添加字母U到文字组
    const letterU = createLetterU();
    letterU.position.set(0, -0.9, 0); // U调整位置
    letterU.rotation.y = Math.PI / 2; // 水平旋转90度
    letterU.rotation.z = Math.PI / 2; // 再旋转90度
    textGroup.add(letterU);

    // 添加字母R到文字组
    const letterR = createLetterR();
    letterR.position.set(0, -0.3, 0); // R调整位置
    letterR.rotation.y = Math.PI / 2; // 水平旋转90度
    letterR.rotation.z = Math.PI / 2; // 再旋转90度
    textGroup.add(letterR);

    // 添加字母S到文字组
    const letterS = createLetterS();
    letterS.position.set(0, 0.3, 0); // S调整位置
    letterS.rotation.y = Math.PI / 2; // 水平旋转90度
    letterS.rotation.z = Math.PI / 2; // 再旋转90度
    textGroup.add(letterS);

    // 添加字母O到文字组
    const letterO = createLetterO();
    letterO.position.set(0, 0.9, 0); // O调整位置
    letterO.rotation.y = Math.PI / 2; // 水平旋转90度
    letterO.rotation.z = Math.PI / 2; // 再旋转90度
    textGroup.add(letterO);

    // 添加第二个字母R到文字组（完成CURSOR）
    const letterR2 = createLetterR();
    letterR2.position.set(0, 1.5, 0); // 第二个R在O的右侧
    letterR2.rotation.y = Math.PI / 2; // 水平旋转90度
    letterR2.rotation.z = Math.PI / 2; // 再旋转90度
    textGroup.add(letterR2);
    
    return textGroup;
  };

  return (
    <group
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      {/* 主要的硬币圆柱体 - 暂时隐藏 */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2, 2, 0.3, 32]} />
        <meshStandardMaterial
          color={coinColor}
          metalness={0.8}
          roughness={0.2}
          emissive={coinColor}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* 硬币边缘装饰 */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[2, 0.05, 8, 32]} />
        <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
      </mesh>

      {/* 正面的"Cursor"文字 */}
      <group rotation={[0, 0, Math.PI / 2]} position={[0, 0.5, 0.35]} scale={[1.0, 1.0, 1.0]}>
        <primitive object={createCursorText()} />
      </group>

      {/* 背面的"Cursor"文字（镜像） */}
      <group rotation={[0, Math.PI, Math.PI / 2]} position={[0, -0.5, -0.35]} scale={[1.0, 1.0, 1.0]}>
        <primitive object={createCursorText()} />
      </group>

      {/* 序列号显示 - 放在硬币边缘 */}
      <mesh position={[0, -1.5, 0.16]}>
        <boxGeometry args={[1.5, 0.1, 0.05]} />
        <meshStandardMaterial color="#333333" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* 稀有度光环效果 */}
      {coinData.rarity !== 'common' && (
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[2.5, 0.02, 8, 32]} />
          <meshStandardMaterial
            color={coinColor}
            emissive={coinColor}
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
      )}

      {/* 传奇稀有度的额外粒子效果 */}
      {coinData.rarity === 'legendary' && (
        <>
          <mesh position={[0, 0, 0]}>
            <torusGeometry args={[3, 0.01, 8, 32]} />
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={0.5}
              transparent
              opacity={0.4}
            />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <torusGeometry args={[3.5, 0.005, 8, 32]} />
            <meshStandardMaterial
              color="#FFA500"
              emissive="#FFA500"
              emissiveIntensity={0.3}
              transparent
              opacity={0.2}
            />
          </mesh>
        </>
      )}
    </group>
  );
};

export default Coin3D;
