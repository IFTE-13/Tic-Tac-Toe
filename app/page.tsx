"use client"
import { JSX, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Circle } from 'lucide-react';
import { BoardState, Player, Winner } from '@/types';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<Winner>(null);

  const checkWinner = (squares: BoardState): Winner => {
    const lines: number[][] = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a] as Player;
      }
    }
    return squares.every(square => square !== null) ? 'Draw' : null;
  };

  const handleClick = (i: number): void => {
    if (board[i] || winner) return;
    
    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) setWinner(gameWinner);
  };

  const reset = (): void => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const renderSquare = (i: number): JSX.Element => {
    return (
      <Button
        className="w-24 h-24 flex items-center justify-center text-12xl transition-all duration-300 hover:bg-slate-100"
        onClick={() => handleClick(i)}
      >
        {board[i] === 'X' && (
          <X className="text-blue-500 animate-in fade-in zoom-in duration-300" size={30}/>
        )}
        {board[i] === 'O' && (
          <Circle className="text-red-500 animate-in fade-in zoom-in duration-300" />
        )}
      </Button>
    );
  };

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <Card className="p-6 max-w-md mx-auto">
        <div className="text-center mb-4">
          {winner ? (
            <h2 className="text-2xl font-bold mb-4">
              {winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`}
            </h2>
          ) : (
            <h2 className="text-2xl font-bold mb-4">
              Now Playing: {isXNext ? 'X' : 'O'}
            </h2>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i}>{renderSquare(i)}</div>
          ))}
        </div>

        <Button 
          className="w-full"
          onClick={reset}
        >
          Reset Game
        </Button>
      </Card>
    </div>
  );
};

export default TicTacToe;