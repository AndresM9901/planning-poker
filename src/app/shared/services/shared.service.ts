import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { v4 as uuidv4 } from 'uuid';
import { Player } from '../../config/interfaces/player.interface';

@Injectable({providedIn: 'root'})
export class SharedService {
  private isFormSubmitted = new BehaviorSubject<boolean>(false);
  isFormSubmitted$ = this.isFormSubmitted.asObservable();
  private gameName: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private newPlayerSubject = new BehaviorSubject<Player>({} as Player);
  newPlayer$ = this.newPlayerSubject.asObservable();
  private gameId!: string | null;
  private baseUrl: string = 'localhost:4200/room-game/';

  constructor() { }

  sendNewPlayer(player: Player) {
    this.newPlayerSubject.next(player);
  }
  set setFormSubmitted(value: boolean) {
    this.isFormSubmitted.next(value);
  }

  generateUniqueId(): string {
    return uuidv4();
  }

  setGameId(id: string | null) {
    this.gameId = id;
  }

  set setGameName(name: string) {
    this.gameName.next(name);
  }

  get getGameName(): Observable<string> {
    return this.gameName.asObservable();
  }

  get getIdRoom(): string | null {
    return this.gameId;
  }

  getUrl(): string {
    return `${this.baseUrl}${this.gameId}`;
  }
}
