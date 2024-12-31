"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GameHistory } from "@/types";

interface HistoryTableProps {
  history: GameHistory[];
}

export const HistoryTable: React.FC<HistoryTableProps> = ({ history }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Date</TableHead>
        <TableHead>Winner</TableHead>
        <TableHead>Player X</TableHead>
        <TableHead>Player O</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {history.map((game, index) => (
        <TableRow key={index}>
          <TableCell>{game.date}</TableCell>
          <TableCell>{game.winner}</TableCell>
          <TableCell>{game.playerX}</TableCell>
          <TableCell>{game.playerO}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);