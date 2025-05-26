import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { CoinData } from '../utils';

interface CoinInfoProps {
  coinData: CoinData;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
  max-width: 350px;
  margin: 0 auto;
`;

const SerialNumber = styled.h1<{ rarity: string }>`
  font-size: 2.5em;
  font-weight: bold;
  margin: 0 0 10px 0;
  background: ${(props) => {
    switch (props.rarity) {
      case 'legendary':
        return 'linear-gradient(45deg, #FFD700, #FFA500)';
      default:
        return 'linear-gradient(45deg, #C0C0C0, #E0E0E0)';
    }
  }};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  ${(props) =>
    props.rarity === 'legendary' && css`animation: ${sparkle} 2s infinite;`}
`;

const CoinName = styled.h2`
  font-size: 1.4em;
  margin: 0 0 15px 0;
  color: #FFFFFF;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 1em;
  line-height: 1.6;
  margin: 0 0 20px 0;
  color: #CCCCCC;
`;

const RarityBadge = styled.div<{ rarity: string }>`
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9em;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: ${(props) => {
    switch (props.rarity) {
      case 'legendary':
        return 'linear-gradient(45deg, #FFD700, #FFA500)';
      default:
        return 'linear-gradient(45deg, #888888, #AAAAAA)';
    }
  }};
  color: ${(props) => (props.rarity === 'common' ? '#000' : '#FFF')};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  ${(props) =>
    props.rarity === 'legendary' &&
    css`
    animation: ${sparkle} 3s infinite;
    box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
  `}
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatItem = styled.div`
  text-align: center;
  
  .label {
    font-size: 0.8em;
    color: #999;
    margin-bottom: 5px;
  }
  
  .value {
    font-size: 1.1em;
    font-weight: bold;
    color: #FFF;
  }
`;

const CoinInfo: React.FC<CoinInfoProps> = ({ coinData }) => {
  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return '传奇';
      default:
        return '普通';
    }
  };

  const getRarityChance = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return '1%';
      default:
        return '99%';
    }
  };

  return (
    <Container>
      <SerialNumber rarity={coinData.rarity}>
        {coinData.serialNumber}
      </SerialNumber>

      <CoinName>{coinData.name}</CoinName>

      <Description>{coinData.description}</Description>

      <RarityBadge rarity={coinData.rarity}>
        {getRarityText(coinData.rarity)}
      </RarityBadge>

      <Stats>
        <StatItem>
          <div className="label">稀有度</div>
          <div className="value">{getRarityText(coinData.rarity)}</div>
        </StatItem>
        <StatItem>
          <div className="label">所有者</div>
          <div className="value">{"-"}</div>
        </StatItem>
        <StatItem>
          <div className="label">年份</div>
          <div className="value">2025</div>
        </StatItem>
      </Stats>
    </Container>
  );
};

export default CoinInfo;
