"use client"
import { Button } from '@/components/ui/button';
import { X, Circle } from 'lucide-react';
import { Player } from '@/types';

interface SquareProps {
  value: Player | null;
  onClick: () => void;
}

export const Square: React.FC<SquareProps> = ({ value, onClick }) => (
  <Button
    className="h-24 w-24 flex items-center justify-center transition-all duration-300 hover:bg-slate-100"
    onClick={onClick}
  >
    {value === 'X' && (
      <X className="text-blue-500 animate-in fade-in zoom-in duration-300" />
    )}
    {value === 'O' && (
      <Circle className="text-red-500 animate-in fade-in zoom-in duration-300" />
    )}
  </Button>
);