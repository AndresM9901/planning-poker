import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomValidators } from '../../shared/validators/custom-validators';
import { SharedService } from '../../shared/services/shared/shared.service';
import { RoomService } from '../../services/room/room.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.scss'
})
export class CreateRoomComponent {
  roomNameControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(20),
    Validators.pattern(/^[a-zA-Z0-9 ]*$/),
    CustomValidators.noLeadingTrailingSpaces,
    CustomValidators.noTrailingSpaces,
    CustomValidators.noConsecutiveSpaces,
    CustomValidators.maxThreeNumbers,
    CustomValidators.noOnlyNumbers,
    CustomValidators.noStartWithNumber
  ]);

  constructor(private router: Router, private sharedService: SharedService, private roomService: RoomService) { }

  onInputValueChange(value: string): void {
    this.roomNameControl.setValue(value);
  }

  onSubmit(event: Event) {
    event?.preventDefault();
    const gameId = this.sharedService.generateUniqueId();
    // this.sharedService.setGameName = this.roomNameControl.value;
    this.roomService.createRoom(gameId, this.roomNameControl.value);
    this.router.navigate([`/room-game/${gameId}` ]);
  }
}
