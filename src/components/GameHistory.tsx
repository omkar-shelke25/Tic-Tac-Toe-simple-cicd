import React from 'react';
import styled, { keyframes } from 'styled-components';
import { History, Clock } from 'lucide-react';

interface Game {
  winner: string | null;
  board: Array<string | null>;
  date: Date;
}

interface GameHistoryProps {
  history: Game[];
}

const Container = styled.div`
  background: linear-gradient(135deg, #f6d365, #fda085);
  padding: 24px;
  border-radius: 16px;
  border: 2px solid #fff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HistoryList = styled.div`
  max-height: 240px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-right: 4px;
`;

const popAnimation = keyframes`
  0% { transform: scale(0.95); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const HistoryItem = styled.div`
  background: linear-gradient(135deg, #a1c4fd, #c2e9fb);
  border-radius: 12px;
  padding: 16px;
  font-size: 0.875rem;
  border: 2px solid transparent;
  background-clip: padding-box;
  animation: ${popAnimation} 0.5s ease-out;
  transition: transform 0.3s ease, background 0.3s ease;
  &:hover {
    transform: translateY(-4px);
    background: linear-gradient(135deg, #89f7fe, #66a6ff);
  }
`;

const HistoryItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const WinnerText = styled.span<{ winner: string | null }>`
  font-weight: 700;
  color: ${props =>
    props.winner === 'X'
      ? '#4F46E5'
      : props.winner === 'O'
      ? '#8B5CF6'
      : '#374151'};
`;

const Timestamp = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #374151;
`;

const NoGamesText = styled.p`
  color: #374151;
  font-size: 0.875rem;
  font-style: italic;
  text-align: center;
`;

const GameHistory: React.FC<GameHistoryProps> = ({ history }) => {
  // Format date to a readable string
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  // Get result text based on winner
  const getResultText = (winner: string | null) => {
    return winner ? `Player ${winner} won` : 'Draw';
  };

  return (
    <Container>
      <Title>
        <History size={24} color="#fff" />
        Game History
      </Title>
      <HistoryList>
        {history.length === 0 ? (
          <NoGamesText>No games played yet</NoGamesText>
        ) : (
          [...history].reverse().map((game, index) => (
            <HistoryItem key={index}>
              <HistoryItemHeader>
                <WinnerText winner={game.winner}>
                  {getResultText(game.winner)}
                </WinnerText>
                <Timestamp>
                  <Clock size={18} color="#374151" />
                  {formatDate(game.date)}
                </Timestamp>
              </HistoryItemHeader>
            </HistoryItem>
          ))
        )}
      </HistoryList>
    </Container>
  );
};

export default GameHistory;
