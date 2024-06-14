import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';

import { CreateUserComponent } from './create-user.component';
import { SharedService } from '../../../shared/services/shared/shared.service';
import { CreatePlayerService } from '../../../services/create-player/create-player.service';
import { Player } from '../../../config/interfaces/player.interface';
import { InputComponent } from '../../atom/input/input.component';
import { InputRadioComponent } from '../../atom/input-radio/input-radio.component';
import { ButtonComponent } from '../../atom/button/button.component';
import { Observable } from 'rxjs';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let sharedService: SharedService;
  let formBuilder: FormBuilder;
  let createPlayerService: CreatePlayerService;
  let mockCreatePlayerService = {
    addPlayer: (newPlayer: Player) => {},
    joinGame: (newPlayer: Player) => {},
    createPlayerSession: (newPlayer: Player) => {},
  };
  let mockSharedService = {
    isFormSubmitted: false,
    gameName: '',
    newPlayerSubject: {},
    newPlayer$: {} as Observable<Player>,
    gameId: '',
    baseUrl: 'localhost:4200/room-game/',
    sendNewPlayer: (player: Player) => {},
    setFormSubmitted: (value: boolean) => {},
    generateUniqueId: () => {},
    setGameId: (id: string | null) => {},
    setGameName: (name: string) => {},
    getGameName: () => {},
    getIdRoom: () => {},
    getUrl: () => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreateUserComponent,
        InputComponent,
        InputRadioComponent,
        ButtonComponent
      ],
      providers: [
        { provide: CreatePlayerService, useValue: mockCreatePlayerService },
        { provide: SharedService, useValue: mockSharedService }
      ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    sharedService = fixture.debugElement.injector.get(SharedService);
    formBuilder = fixture.debugElement.injector.get(FormBuilder);
    createPlayerService = fixture.debugElement.injector.get(CreatePlayerService);
    component.playerForm = formBuilder.group({
      playerName: new FormControl(''),
      gameMode: new FormControl('')
    });
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Output() formSubmitted

  it('formSubmitted: should emit formSubmitted event', () => {
    const spy = jest.spyOn(component.formSubmitted, 'emit');

    component.formSubmitted.emit();

    expect(spy).toHaveBeenCalled();
  });

  // onInputValueChange()

  it('onInputValueChange: should call onInputValueChange', () => {
    const mockEvent = { target: { value: 'Sprint 32' } };
    component.playerForm = formBuilder.group({
      playerName: '',
    });

    component.onInputValueChange(mockEvent.target.value);

    expect(component.playerForm.controls['playerName'].value).toBe(mockEvent.target.value);
  });

  // onInputRadioChange()

  it('onInputRadioChange: should call onInputRadioChange with value "player"', () => {
    const mockEvent = { target: { value: 'player' } };
    component.playerForm = formBuilder.group({
      gameMode: '',
    });

    component.onInputRadioChange(mockEvent.target.value as 'player' | 'viewer');

    expect(component.playerForm.controls['gameMode'].value).toBe(mockEvent.target.value);
  });

  it('onInputRadioChange: should call onInputRadioChange with value "viewer"', () => {
    const mockEvent = { target: { value: 'viewer' } };
    component.playerForm = formBuilder.group({
      gameMode: '',
    });

    component.onInputRadioChange(mockEvent.target.value as 'player' | 'viewer');

    expect(component.playerForm.controls['gameMode'].value).toBe(mockEvent.target.value);
  });

  // generateId()

  it('generateId: should return a number between 1 and 100', () => {
    const spy1 = jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const spy2 = jest.spyOn(Math, 'floor').mockReturnValue(51);

    component.generateId();

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy1).toHaveReturnedWith(0.5);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveReturnedWith(51);
  });

  // onSubmit()

  it('onSubmit: should create a new player and trigger appropriate services', () => {
    const id = jest.spyOn(component as any, 'generateId').mockReturnValue(1);
    const idGame = jest.spyOn(mockSharedService, 'getIdRoom').mockImplementation();
    const initialLetter = jest.spyOn(component as any, 'extractInitialLettersToPlayer').mockReturnValue('Pl');
    const spy1 = jest.spyOn(createPlayerService, 'addPlayer').mockImplementation();
    const spy2 = jest.spyOn(createPlayerService, 'joinGame').mockImplementation();
    const spy3 = jest.spyOn(createPlayerService, 'createPlayerSession').mockImplementation();
    const spy4 = jest.spyOn(component.formSubmitted, 'emit').mockImplementation();
    component.playerForm = formBuilder.group({
      playerName: new FormControl('Player'),
      gameMode: new FormControl('player')
    });
    const mockPlayer = {
      id: 1,
      idGame,
      initialLetter: 'Pl',
      name: 'Player',
      gameMode: 'player',
      selectedCard: false,
      isHost: true,
      point: 0
    };

    component.onSubmit();

    expect(spy1).toHaveBeenCalledWith(mockPlayer);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledWith(mockPlayer);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy3).toHaveBeenCalledWith(mockPlayer);
    expect(spy3).toHaveBeenCalledTimes(1);
    expect(spy4).toHaveBeenCalledTimes(1);
    expect(id).toHaveBeenCalledTimes(1);
    expect(id).toHaveReturnedWith(1);
    expect(initialLetter).toHaveBeenCalledTimes(1);
    expect(initialLetter).toHaveReturnedWith('Pl');
  });

  // cambiar descripcion
  it('onSubmit: should not call any service if the form is invalid', done => {
    const spy1 = jest.spyOn(component, 'generateId').mockImplementation();
    const spy2 = jest.spyOn(mockSharedService, 'getIdRoom').mockImplementation();
    const spy3 = jest.spyOn(component as any, 'extractInitialLettersToPlayer')
    const spy4 = jest.spyOn(createPlayerService, 'addPlayer').mockImplementation();
    const spy5 = jest.spyOn(createPlayerService, 'joinGame').mockImplementation();
    const spy6 = jest.spyOn(createPlayerService, 'createPlayerSession').mockImplementation();
    const spy7 = jest.spyOn(component.formSubmitted, 'emit').mockImplementation();

    // Usar done para terminar la ejecucion del form
    // component.playerForm.controls['playerName'].reset('');

    const mockPlayer = {
      id: 1,
      idGame: 1,
      initialLetter: 'Pl',
      name: 'Player',
      gameMode: 'player',
      selectedCard: false,
      isHost: true,
      point: 0
    };

    component.onSubmit();

    expect(spy1).not.toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
    expect(spy3).not.toHaveBeenCalled();
    expect(spy4).not.toHaveBeenCalled();
    expect(spy4).not.toHaveBeenCalledWith(mockPlayer);
    expect(spy5).not.toHaveBeenCalled();
    expect(spy6).not.toHaveBeenCalled();
    expect(spy7).not.toHaveBeenCalled();
  });

  // extractInitialLettersToPlayer

  it('extractInitialLettersToPlayer: should call extractInitialLettersToPlayer when onSubmit is called', () => {
    const spy1 = jest.spyOn(component as any, 'extractInitialLettersToPlayer').mockReturnValue('Pl');

    component.extractInitialLettersToPlayer('Player');

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy1).toHaveReturnedWith('Pl');
  });
});
