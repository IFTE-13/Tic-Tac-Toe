"use client"
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from 'lucide-react';

interface PlayerModalProps {
  open: boolean;
  onStart: (playerX: string, playerO: string) => void;
}

export const PlayerModal: React.FC<PlayerModalProps> = ({ open, onStart }) => {
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');

  const handleStart = () => {
    if (playerX && playerO) {
      onStart(playerX, playerO);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className='w-[380px] p-8'>
        <DialogHeader>
          <DialogTitle>Enter Player Names</DialogTitle>
        </DialogHeader>
        <div className="space-y-8">
          <div className="space-y-1">
            <label className="text-sm font-medium">Player X</label>
            <Input 
              value={playerX}
              onChange={(e) => setPlayerX(e.target.value)}
              placeholder="Enter name"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Player O</label>
            <Input 
              value={playerO}
              onChange={(e) => setPlayerO(e.target.value)}
              placeholder="Enter name"
            />
          </div>
          <Button 
            className="w-1/8" 
            onClick={handleStart}
            disabled={!playerX || !playerO}
            effect="expandIcon" 
            icon={ArrowRightIcon} 
            iconPlacement="right"
          >
            Start Game
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};