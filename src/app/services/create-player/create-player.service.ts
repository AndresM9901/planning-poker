import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Player } from '../../config/interfaces/player.interface';
import { SharedService } from '../../shared/services/shared.service';
import { WebSocketService } from '../web-socket/web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class CreatePlayerService {
  players: Player[] = [
    // {
    //   id: 1,
    //   initialLetter: '',
    //   name: 'Luisa',
    //   gameMode: 'player',
    //   selectedCard: false,
    //   isHost: false,
    //   point: 0,
    // },
    // {
    //   id: 2,
    //   initialLetter: '',
    //   name: 'Vale',
    //   gameMode: 'player',
    //   selectedCard: false,
    //   isHost: false,
    //   point: 0,
    // },
    // {
    //   id: 3,
    //   initialLetter: '',
    //   name: 'Pedro',
    //   gameMode: 'viewer',
    //   selectedCard: false,
    //   isHost: false,
    //   point: 0,
    // },
    // {
    //   id: 4,
    //   initialLetter: '',
    //   name: 'David',
    //   gameMode: 'player',
    //   selectedCard: false,
    //   isHost: false,
    //   point: 0,
    // },
    // {
    //   id: 5,
    //   initialLetter: '',
    //   name: 'Luis',
    //   gameMode: 'player',
    //   selectedCard: false,
    //   isHost: false,
    //   point: 0,
    // },
    // {
    //   id: 6,
    //   initialLetter: '',
    //   name: 'Oscar',
    //   gameMode: 'player',
    //   selectedCard: false,
    //   isHost: false,
    //   point: 0,
    // },
    // {
    //   id: 7,
    //   initialLetter: '',
    //   name: 'Carlos',
    //   gameMode: 'player',
    //   selectedCard: false,
    //   isHost: false,
    //   point: 0,
    // },
  ];
  private playersSubject = new BehaviorSubject<Player[]>(this.players);
  players$: Observable<Player[]> = this.playersSubject.asObservable();
  private playerSessionSubject = new BehaviorSubject<Player>({
    id: 0,
    idGame: this.sharedService.getIdRoom,
    initialLetter: '',
    name: '',
    gameMode: 'player',
    selectedCard: false,
    isHost: false,
    point: 0,
  });
  playerSession$: Observable<Player> = this.playerSessionSubject.asObservable();


  constructor(private sharedService: SharedService, private webSocketService: WebSocketService) { }

  addPlayer(newPlayer: Player): void {
    const currentPlayers = this.playersSubject.getValue();
    const updatePlayers = [
      ...currentPlayers,
      newPlayer
    ];
    this.playersSubject.next(updatePlayers);
  }

  createPlayerSession(player: Player): void {
    this.playerSessionSubject.next(player);
  }

  joinGame(player: Player): void {
    this.webSocketService.emitEvent('join-game', player);
  }
}
