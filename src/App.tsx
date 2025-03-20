import React, { useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { RefreshCw, Award, XCircle, Trophy, Frown, PlayCircle, Star, Smile } from 'lucide-react';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import GameHistory from './components/GameHistory';
import { calculateWinner, checkDraw } from './utils/gameLogic';

// Global Style to import the gaming font
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
`;

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #c3cfe2, #f6d365, #fda085);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Card = styled.div`
  max-width: 1024px;
  width: 100%;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const Content = styled.div`
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const GameSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonsContainer = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 16px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
`;

const NewGameButton = styled(Button)`
  background: #667eea;
  color: #fff;
  &:hover {
    background: #5a67d8;
  }
`;

const ResetStatsButton = styled(Button)`
  background: #e2e8f0;
  color: #4a5568;
  &:hover {
    background: #cbd5e0;
  }
`;

const StatsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// =====================
// Header Component
// =====================

// Animation for decorative icons
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

// Styled Header container with a vibrant gaming-inspired gradient background
const Header = styled.header`
  background: linear-gradient(135deg, #ff416c, #ff4b2b);
  padding: 24px;
  text-align: center;
  color: #fff;
  position: relative;
  overflow: hidden;
`;

// Styled Title using the gaming font
const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  font-family: 'Press Start 2P', cursive;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
`;

// Styled Subtitle using the gaming font
const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-top: 12px;
  color: #ffe4e1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Press Start 2P', cursive;
`;

// Animated decorative icons for a playful touch
const DecorativeStar = styled(Star)`
  animation: ${bounce} 2s infinite;
`;

const DecorativeSmile = styled(Smile)`
  animation: ${bounce} 2s infinite;
  animation-delay: 0.5s;
`;

const HeaderComponent: React.FC = () => (
  <Header>
    <Title>
      <Award size={32} />
      Tic Tac Toe
      <DecorativeStar size={28} color="#FFD700" />
    </Title>
    <Subtitle>
      A classic game reimagined
      <DecorativeSmile size={24} color="#FFD700" />
    </Subtitle>
  </Header>
);

// =====================
// Status Message Component
// =====================

const StatusMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.5rem;
  color: #4c51bf;
  font-weight: 600;
  margin-bottom: 16px;
`;

const renderStatusMessage = (gameStatus: 'playing' | 'won' | 'draw', xIsNext: boolean) => {
  if (gameStatus === 'won') {
    const winner = !xIsNext ? 'X' : 'O';
    return (
      <StatusMessage>
        <Trophy size={24} color="#FFC107" />
        <span>Player {winner} wins!</span>
      </StatusMessage>
    );
  } else if (gameStatus === 'draw') {
    return (
      <StatusMessage>
        <Frown size={24} color="#E53935" />
        <span>It's a draw!</span>
      </StatusMessage>
    );
  } else {
    return (
      <StatusMessage>
        <PlayCircle size={24} color="#43A047" />
        <span>Next player: {xIsNext ? 'X' : 'O'}</span>
      </StatusMessage>
    );
  }
};

// =====================
// App Component
// =====================

function App() {
  // Game state
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [gameHistory, setGameHistory] = useState<Array<{
    winner: string | null;
    board: Array<string | null>;
    date: Date;
  }>>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'draw'>('playing');
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  // Check for winner or draw
  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setGameStatus('won');
      setWinningLine(result.line);
      setScores(prevScores => ({
        ...prevScores,
        [result.winner]: prevScores[result.winner as keyof typeof prevScores] + 1
      }));
      setGameHistory(prev => [
        ...prev,
        { winner: result.winner, board: [...board], date: new Date() }
      ]);
    } else if (checkDraw(board)) {
      setGameStatus('draw');
      setScores(prevScores => ({
        ...prevScores,
        draws: prevScores.draws + 1
      }));
      setGameHistory(prev => [
        ...prev,
        { winner: null, board: [...board], date: new Date() }
      ]);
    }
  }, [board]);

  // Handle square click
  const handleClick = (index: number) => {
    if (board[index] || gameStatus !== 'playing') return;
    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameStatus('playing');
    setWinningLine(null);
  };

  // Reset all stats
  const resetStats = () => {
    resetGame();
    setScores({ X: 0, O: 0, draws: 0 });
    setGameHistory([]);
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Card>
          <HeaderComponent />
          <Content>
            {/* Game Section */}
            <GameSection>
              {renderStatusMessage(gameStatus, xIsNext)}
              <Board
                squares={board}
                onClick={handleClick}
                winningLine={winningLine}
              />
              <ButtonsContainer>
                <NewGameButton onClick={resetGame}>
                  <RefreshCw size={20} />
                  New Game
                </NewGameButton>
                <ResetStatsButton onClick={resetStats}>
                  <XCircle size={20} />
                  Reset All
                </ResetStatsButton>
              </ButtonsContainer>
            </GameSection>
            {/* Stats Section */}
            <StatsSection>
              <ScoreBoard scores={scores} />
              <GameHistory history={gameHistory} />
            </StatsSection>
          </Content>
        </Card>
      </AppContainer>
    </>
  );
}

export default App;
