import React from 'react';
import styled from 'styled-components';
import { Trophy, User, Users } from 'lucide-react';

interface ScoreBoardProps {
  scores: {
    X: number;
    O: number;
    draws: number;
  };
}

const Container = styled.div`
  background: #F1F5F9;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.02);
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const ScoreList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

interface ScoreItemProps {
  bgColor: string;
}

const ScoreItem = styled.div<ScoreItemProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: ${(props) => props.bgColor};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    transform: translateY(-3px);
  }
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 1rem;
`;

interface ScoreValueProps {
  color: string;
}

const ScoreValue = styled.span<ScoreValueProps>`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${(props) => props.color};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores }) => {
  return (
    <Container>
      <Title>
        <Trophy size={24} style={{ color: "#F59E0B" }} />
        Score Board
      </Title>
      <ScoreList>
        <ScoreItem bgColor="#1E3A8A">
          <Label>
            <User size={20} style={{ color: "#BFDBFE" }} />
            <span style={{ color: "#BFDBFE" }}>Pushpa Raj</span>
          </Label>
          <ScoreValue color="#BFDBFE">{scores.X}</ScoreValue>
        </ScoreItem>
        <ScoreItem bgColor="#4C1D95">
          <Label>
            <User size={20} style={{ color: "#DDD6FE" }} />
            <span style={{ color: "#DDD6FE" }}>Appanna</span>
          </Label>
          <ScoreValue color="#DDD6FE">{scores.O}</ScoreValue>
        </ScoreItem>
        <ScoreItem bgColor="#1F2937">
          <Label>
            <Users size={20} style={{ color: "#E5E7EB" }} />
            <span style={{ color: "#E5E7EB" }}>Draws</span>
          </Label>
          <ScoreValue color="#E5E7EB">{scores.draws}</ScoreValue>
        </ScoreItem>
      </ScoreList>
    </Container>
  );
};

export default ScoreBoard;