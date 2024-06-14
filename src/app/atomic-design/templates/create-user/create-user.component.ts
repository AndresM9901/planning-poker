import { Component, forwardRef, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CustomValidators } from '../../../shared/validators/custom-validators';
import { SharedService } from '../../../shared/services/shared/shared.service';
import { CreatePlayerService } from '../../../services/create-player/create-player.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CreateUserComponent),
      multi: true
    }
  ]
})
export class CreateUserComponent {
  playerName: string = '';

  playerForm: FormGroup;
  @Output() formSubmitted = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private createPlayerService: CreatePlayerService
  ) {
    this.playerForm = this.formBuilder.group({
      playerName: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9 ]*$/),
        CustomValidators.noLeadingTrailingSpaces,
        CustomValidators.noTrailingSpaces,
        CustomValidators.noConsecutiveSpaces,
        CustomValidators.maxThreeNumbers,
        CustomValidators.noOnlyNumbers,
        CustomValidators.noStartWithNumber,
      ]],
      gameMode: new FormControl('player'),
    });
  }

  onInputValueChange(value: string): void {
    this.playerForm.controls['playerName'].setValue(value);
  }

  onInputRadioChange(value: 'player' | 'viewer'): void {
    this.playerForm.controls['gameMode'].setValue(value);
  }

  generateId(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  /**
  * description: Handles the submission of a new player to the game if the form data is valid.
  * Creates a player with a unique identifier, initial and other details, adds him/her to the game, joins the game, and creates a player session.
  * and creates a player session. Emits an event indicating that the form has been submitted.
  * @date: 15-05-2024
  * @author: Andres Marin
  * @method
  */
  onSubmit(): void {
    // validar si los datos son ingresados
    if(this.playerForm.invalid) return;
    const id = this.generateId();
    const idGame = this.sharedService.getIdRoom;
    const initialLetter = this.extractInitialLettersToPlayer(this.playerForm.controls['playerName'].value);
    const name = this.playerForm.controls['playerName'].value;
    const gameMode = this.playerForm.controls['gameMode'].value;
    const newPlayer = {
      id,
      idGame,
      initialLetter,
      name,
      gameMode,
      selectedCard: false,
      isHost: true,
      point: 0,
    }
    this.sharedService.setFormSubmitted = true;
    this.createPlayerService.addPlayer(newPlayer);
    this.createPlayerService.joinGame(newPlayer);
    this.createPlayerService.createPlayerSession(newPlayer);
    this.formSubmitted.emit();
  }

  extractInitialLettersToPlayer(name: string): string {
    return name.slice(0, 2);
  }

  convertToFormControl(absCtrl: AbstractControl): FormControl {
    return absCtrl as FormControl;
  }
}
