import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../../config/interfaces/player.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GivePermissionService {
  response = new Subject<any>();

  constructor(private http: HttpClient) {}

  giveAdminRoleToThePlayer(player: Player) {
    const body = {
      id: player.id,
      name: player.name,
      gameMode: player.gameMode,
      selectedCard: player.selectedCard,
      isHost: player.isHost,
      point: player.point,
      initialLetter: player.initialLetter,
      idGame: player.idGame
    };
    this.http.post<any>('http://localhost:3001/add-admin', body).subscribe(
      (response) => {
        this.response.next(response);
      }
    );
  }
}
