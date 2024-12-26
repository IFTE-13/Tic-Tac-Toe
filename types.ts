export type Player = 'X' | 'O';
export type BoardState = (Player | null)[];
export type Winner = Player | 'Draw' | null;