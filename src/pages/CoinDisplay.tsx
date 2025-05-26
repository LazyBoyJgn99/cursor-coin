import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import styled, { keyframes, css } from 'styled-components';
import * as THREE from 'three';
import Coin3D from '../components/Coin3D';
import CoinInfo from '../components/CoinInfo';
import { getCoinKeyFromUrl, generateCoinData, CoinData } from '../utils';

// 简单的轨道控制组件
const CameraControls: React.FC = () => {
  const { camera, gl } = useThree();
  const isPressed = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      isPressed.current = true;
      previousMousePosition.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = () => {
      isPressed.current = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isPressed.current) return;

      const deltaX = event.clientX - previousMousePosition.current.x;
      const deltaY = event.clientY - previousMousePosition.current.y;

      // 水平旋转相机
      const spherical = new THREE.Spherical();
      spherical.setFromVector3(camera.position);
      spherical.theta -= deltaX * 0.01;
      spherical.phi += deltaY * 0.01;

      // 限制垂直角度
      spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));

      camera.position.setFromSpherical(spherical);
      camera.lookAt(0, 0, 0);

      previousMousePosition.current = { x: event.clientX, y: event.clientY };
    };

    gl.domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      gl.domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [camera, gl]);

  return null;
};

// 简单的环境光照组件
const SceneLighting: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 10, 0]} intensity={0.5} />

      {/* 简单的环境背景 */}
      <mesh>
        <sphereGeometry args={[50, 32, 32]} />
        <meshBasicMaterial
          color="#001122"
          side={THREE.BackSide}
          transparent
          opacity={0.3}
        />
      </mesh>
    </>
  );
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #000428 0%, #004e92 100%);
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 1s ease-out;
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 60vh;
  position: relative;
  min-height: 400px;
`;

const InfoContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  padding: 20px;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.9) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
  text-align: center;
  padding: 20px;
  
  h1 {
    font-size: 2em;
    margin-bottom: 20px;
    color: #FF6B6B;
  }
  
  p {
    font-size: 1.2em;
    line-height: 1.6;
    margin-bottom: 30px;
    color: #CCCCCC;
  }
  
  .example {
    background: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 10px;
    font-family: monospace;
    color: #FFD700;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 3px solid #333;
    border-top: 3px solid #FFD700;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ParticleBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(1px 1px at 20px 30px, #fff, transparent),
      radial-gradient(1px 1px at 40px 70px, rgba(255, 255, 255, 0.5), transparent),
      radial-gradient(1px 1px at 90px 40px, rgba(255, 255, 255, 0.3), transparent),
      radial-gradient(1px 1px at 130px 80px, rgba(255, 255, 255, 0.6), transparent),
      radial-gradient(1px 1px at 160px 30px, rgba(255, 255, 255, 0.4), transparent);
    background-repeat: repeat;
    background-size: 200px 100px;
    animation: sparkle 8s linear infinite;
    opacity: 0.6;
  }
  
  @keyframes sparkle {
    from { transform: translateY(0px); }
    to { transform: translateY(-200px); }
  }
`;

const CoinDisplay: React.FC = () => {
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const key = getCoinKeyFromUrl();
    console.log('URL Key:', key); // 调试信息

    if (!key) {
      setError('无效的纪念币密钥');
      setLoading(false);
      return;
    }

    try {
      const data = generateCoinData(key);
      console.log('Generated Coin Data:', data); // 调试信息
      setCoinData(data);
    } catch (err) {
      console.error('Error generating coin data:', err); // 调试信息
      setError('生成纪念币数据时出错');
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <div className="spinner"></div>
          <p>正在加载您的纪念币...</p>
        </LoadingContainer>
      </Container>
    );
  }

  if (error || !coinData) {
    return (
      <Container>
        <ParticleBackground />
        <ErrorContainer>
          <h1>😞 纪念币加载失败</h1>
          <p>
            请确保您的URL包含有效的6位数字密钥
            <br />
            URL格式应该类似于：
          </p>
          <div className="example">https://your-domain.com?key=000001</div>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <ParticleBackground />

      <CanvasContainer>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense
            fallback={
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  fontSize: '18px',
                }}
              >
                正在加载3D纪念币...
              </div>
            }
          >
            <SceneLighting />
            <Coin3D coinData={coinData} />
            <CameraControls />
          </Suspense>
        </Canvas>
      </CanvasContainer>

      <InfoContainer>
        <CoinInfo coinData={coinData} />
      </InfoContainer>
    </Container>
  );
};

export default CoinDisplay;
