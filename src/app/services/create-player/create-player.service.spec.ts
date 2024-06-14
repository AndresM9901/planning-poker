import { TestBed } from '@angular/core/testing';

import { CreatePlayerService } from './create-player.service';
import { SharedService } from '../../shared/services/shared/shared.service';
import { WebSocketService } from '../web-socket/web-socket.service';
import { Player } from '../../config/interfaces/player.interface';
import { of } from 'rxjs';

describe('CreatePlayerService', () => {
  let service: CreatePlayerService;
  let sharedService: SharedService;
  let webSocketService: WebSocketService;
  let mockSharedService = {
    getIdRoom: () => {}
  };
  let mockWebSocketService = {
    emitEvent: (event: string, data: any) => {}
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SharedService, useValue: mockSharedService
        },
        {
          provide: WebSocketService, useValue: mockWebSocketService
        }
      ]
    });
    service = TestBed.inject(CreatePlayerService);
    sharedService = TestBed.inject(SharedService);
    webSocketService = TestBed.inject(WebSocketService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // addPlayer(newPlayer: Player)

  it('addPlayer: should add a new player to the playersSubject$', () => {
    service.players = [
      {
        id: 1,
        idGame: '001',
        initialLetter: 'A',
        name: 'Player1',
        gameMode: 'player',
        selectedCard: false,
        isHost: false,
        point: 10,
      }
    ];
    const spy1 = jest.spyOn(service['playersSubject$'] as any, 'getValue').mockReturnValue(service.players);
    const spy2 = jest.spyOn(service['playersSubject$'], 'next').mockImplementation();

    const newPlayer: Player = {
      id: 2,
      idGame: '002',
      initialLetter: 'B',
      name: 'Player2',
      gameMode: 'player',
      selectedCard: true,
      isHost: true,
      point: 20,
    }
    const updatePlayers = [...service.players, newPlayer];


    service.addPlayer(newPlayer);

    expect(updatePlayers.length).toBe(2);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy1).toHaveReturnedWith(service.players);
    expect(spy2).toHaveBeenCalledWith(updatePlayers);
    expect(spy2).toHaveBeenCalledTimes(1);

  });

  // createPlayerSession(player: Player)

  it('createPlayerSession: should call the next method of playerSessionSubject$ with the provided player object' ,() => {
    const mockPlayer: Player = {
      id: 0,
      idGame: '000',
      initialLetter: '',
      name: '',
      gameMode: 'player',
      selectedCard: false,
      isHost: false,
      point: 0,
    }
    const spy = jest.spyOn(service['playerSessionSubject$'], 'next').mockImplementation();

    service.createPlayerSession(mockPlayer);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(mockPlayer);
  });

  // joinGame(player: Player)

  it('joinGame: should call emitEvent with "join-game" and the provided player object', () => {
    const mockPlayer: Player = {
      id: 0,
      idGame: '000',
      initialLetter: '',
      name: '',
      gameMode: 'player',
      selectedCard: false,
      isHost: false,
      point: 0,
    }
    const spy = jest.spyOn(mockWebSocketService, 'emitEvent').mockImplementation();

    service.joinGame(mockPlayer);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('join-game', mockPlayer);
  });

  // get playerSession()
  it('playerSession: should call playerSessionSubject$ observable once and return the player session', () => {
    const mockPlayer: Player = {
      id: 0,
      idGame: '1',
      initialLetter: '',
      name: '',
      gameMode: 'player',
      selectedCard: false,
      isHost: false,
      point: 0,
    };
    const spy = jest.spyOn(service['playerSessionSubject$'], 'asObservable').mockReturnValue(of(mockPlayer));

    service['playerSession'];

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveReturned();
  });
});
