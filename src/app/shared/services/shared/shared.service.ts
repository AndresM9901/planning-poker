import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { v4 as uuidv4 } from 'uuid';

@Injectable({providedIn: 'root'})
export class SharedService {
  private isFormSubmitted$ = new BehaviorSubject<boolean>(false);
  private gameId!: string | null;
  private baseUrl: string = 'localhost:4200/room-game/';

  constructor() { }

  set setFormSubmitted(value: boolean) {
    this.isFormSubmitted$.next(value);
  }

  generateUniqueId(): string {
    return uuidv4();
  }

  setGameId(id: string | null) {
    this.gameId = id;
  }

  get getIdRoom(): string | null {
    return this.gameId;
  }

  getUrl(): string {
    return `${this.baseUrl}${this.gameId}`;
  }

  get getFormSubmitted(): Observable<any> {
    return this.isFormSubmitted$.asObservable();
  }
}
