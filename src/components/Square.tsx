import React from 'react';

interface SquareProps {
  value: string | null;
  onClick: () => void;
  isWinningSquare: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare }) => {
  const baseClasses = "w-full h-20 text-4xl font-bold flex items-center justify-center rounded-md transition transform duration-300";
  
  // Different styling based on value and winning status
  const getSquareClasses = () => {
    if (isWinningSquare) {
      return `${baseClasses} bg-gradient-to-r from-green-300 to-green-500 text-white border-2 border-green-700 shadow-lg scale-105`;
    }
    
    if (!value) {
      return `${baseClasses} bg-gray-100 hover:bg-gray-200 cursor-pointer shadow-md hover:shadow-lg`;
    }
    
    if (value === 'X') {
      return `${baseClasses} bg-gradient-to-br from-indigo-300 to-blue-300 text-indigo-800 shadow-md hover:shadow-xl`;
    }
    
    return `${baseClasses} bg-gradient-to-br from-purple-300 to-pink-300 text-purple-800 shadow-md hover:shadow-xl`;
  };

  return (
    <button 
      className={getSquareClasses()}
      onClick={onClick}
      aria-label={value ? `Square with ${value}` : "Empty square"}
    >
      {value}
    </button>
  );
};

export default Square;
