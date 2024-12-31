"use client"
import { BoardState } from '@/types';
import { Square } from './Square';

interface BoardProps {
  board: BoardState;
  onSquareClick: (i: number) => void;
}

export const Board: React.FC<BoardProps> = ({ board, onSquareClick }) => (
    <div className="grid grid-cols-3 gap-2 w-fit">
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} className="flex items-center justify-center p-2">
          <Square value={board[i]} onClick={() => onSquareClick(i)} />
        </div>
      ))}
  </div>
);
