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

  // 暂时移除复杂的文字纹理，使用简单几何体

  return (
    <group
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      {/* 主要的硬币圆柱体 */}
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

      {/* 简化的正面文字 - 使用基础几何体 */}
      <mesh position={[0, 0.5, 0.16]}>
        <boxGeometry args={[1.5, 0.1, 0.05]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* 简化的序列号显示 */}
      <mesh position={[0, -0.3, 0.16]}>
        <boxGeometry args={[1, 0.08, 0.05]} />
        <meshBasicMaterial color="#333333" />
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
    </group>
  );
};

export default Coin3D;
