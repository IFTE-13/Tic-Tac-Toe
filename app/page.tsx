"use client"
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Board } from '@/app/components/Board';
import { PlayerModal } from '@/app/components/PlayerModal';
import { HistoryTable } from '@/app/components/HistoryTable';
import { BoardState, Player, Winner, GameHistory } from '@/types';
import { Github } from 'lucide-react';
import Link from 'next/link';

export default function Game() {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<Winner>(null);
  const [showModal, setShowModal] = useState(true);
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');
  const [history, setHistory] = useState<GameHistory[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('gameHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveGame = (winner: string) => {
    const newGame: GameHistory = {
      winner,
      playerX,
      playerO,
      date: new Date().toLocaleDateString()
    };
    const updatedHistory = [newGame, ...history].slice(0, 10); // Keep last 10 games
    setHistory(updatedHistory);
    localStorage.setItem('gameHistory', JSON.stringify(updatedHistory));
  };

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
    if (gameWinner) {
      setWinner(gameWinner);
      saveGame(gameWinner === 'Draw' ? 'Draw' : gameWinner === 'X' ? playerX : playerO);
    }
  };

  const reset = (): void => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setShowModal(true);
  };

  const handleStart = (newPlayerX: string, newPlayerO: string) => {
    setPlayerX(newPlayerX);
    setPlayerO(newPlayerO);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen w-full p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <PlayerModal open={showModal} onStart={handleStart} />
        <div className='flex justify-between items-center'>
          <p className='text-muted-foreground'>made by 
            <Link 
              href={"https://ifte-13.vercel.app/"} 
              target='_blank'
              className='mx-1 underline hover:text-black'
            >
              IFTE-13
            </Link>
          </p>
          <Button effect="shine">
            <Link 
            href={'https://github.com/IFTE-13/Tic-Tac-Toe'}
            className='flex justify-center items-center gap-x-2'
            >
              <Github size={30}/>
              Source Code
            </Link>
          </Button>
        </div>
        
        <Card className="p-6 w-full flex flex-col justify-center items-center">
          <div className="mb-4">
            {winner ? (
              <h2 className="text-2xl font-bold mb-4">
                {winner === 'Draw' 
                  ? "It's a Draw!" 
                  : `Winner: ${winner === 'X' ? playerX : playerO}`}
              </h2>
            ) : (
              <h2 className="text-2xl font-bold mb-4">
                Now Playing: {isXNext ? playerX : playerO} ({isXNext ? 'X' : 'O'})
              </h2>
            )}
          </div>

          <Board board={board} onSquareClick={handleClick} />

          <Button 
            className="w-1/4 mt-8"
            onClick={reset}
            effect="gooeyLeft"
          >
            New Game
          </Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Game History</h2>
          <HistoryTable history={history} />
        </Card>
      </div>
    </div>
  );
};