import { Injectable } from '@angular/core';
import { WebSocketService } from '../web-socket/web-socket.service';
import { Observable } from 'rxjs';
import { Player } from '../../config/interfaces/player.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private webSocketService: WebSocketService) { }

  createRoom(id: string, name: string): void {
    const partida = {
      id,
      name
    }
    this.webSocketService.emitEvent('new-game', partida);
  }

  onUpdateRoom(): Observable<any> {
    return this.webSocketService.listenEvent('update-players');
  }

  onNewPlayer(): Observable<any> {
    return this.webSocketService.listenEvent('new-player');
  }

  selectCard(player: Player): void {
    this.webSocketService.emitEvent('select-card', player);
  }

  onUpdatePlayer(): Observable<any> {
    return this.webSocketService.listenEvent('update-player');
  }

  onSelectedCard(): Observable<any> {
    return this.webSocketService.listenEvent('selected-card');
  }

  revealPoints(isReveal: boolean, isAverage: boolean, isSelectedCards: boolean, isEndVotes: boolean): void {
    this.webSocketService.emitEvent('reveal-points', { isReveal, isAverage, isSelectedCards, isEndVotes });
  }

  onRevealPoints(): Observable<any> {
    return this.webSocketService.listenEvent('reveal-points');
  }

  cardVotes(cardsVotes: any):void {
    this.webSocketService.emitEvent('card-votes', cardsVotes);
  }

  onCardVotes(): Observable<any> {
    return this.webSocketService.listenEvent('card-votes');
  }

  resetGame(players: Player[], scores: any[], selectedCards: any[], average: number, isSelectCards: boolean, isRevealPoints: boolean, isCardsBlocked: boolean, isAverageSelected: boolean, isEndVotes: boolean): void {
    this.webSocketService.emitEvent('reset-game', { players, scores, selectedCards, average, isSelectCards, isRevealPoints, isCardsBlocked, isAverageSelected, isEndVotes });
  }

  onResetGame(): Observable<any> {
    return this.webSocketService.listenEvent('reset-game');
  }

  onChangeMode(player: Player): void {
    this.webSocketService.emitEvent('change-mode', player);
  }

  onUpdateAdmins(): Observable<any> {
    return this.webSocketService.listenEvent('update-admins');
  }
}
