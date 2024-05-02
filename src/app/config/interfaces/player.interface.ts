export interface Player {
  id: number;
  idGame: string | null;
  initialLetter: string;
  name: string;
  gameMode: 'player' | 'viewer';
  selectedCard: boolean;
  isHost: boolean;
  point: number;
}
