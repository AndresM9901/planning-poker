import { TestBed } from '@angular/core/testing';

import { RoomService } from './room.service';
import { WebSocketService } from '../web-socket/web-socket.service';
import { of } from 'rxjs';
import { Player } from '../../config/interfaces/player.interface';

describe('RoomService', () => {
  let service: RoomService;
  let webSocketService: WebSocketService;
  let mockWebSocketService = {
    emitEvent: (event: string, data: any) => {},
    listenEvent: jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: WebSocketService,
          useValue: mockWebSocketService
        }
      ]
    });
    service = TestBed.inject(RoomService);
    webSocketService = TestBed.inject(WebSocketService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // createRoom()

  it('createRoom: should call emitEvent on mockWebSocketService with the correct event and data when createRoom is called', () => {
    const mockPartida = {
      id: 'a12b',
      name: 'Sprint 32'
    };
    const mockEvent = 'new-game';
    const spy = jest.spyOn(mockWebSocketService, 'emitEvent').mockImplementation();

    service.createRoom(mockPartida.id, mockPartida.name);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(mockEvent, mockPartida);
  });

  // onUpdateRoom()

  it('onUpdateRoom: should call listenEvent on WebSocketService with "update-players" and return the correct observable', () => {
    const mockResponse = of([
      {
        id: 1,
        idGame: '001',
        initialLetter: 'Pl',
        name: 'Player1',
        gameMode: 'player',
        selectedCard: false,
        isHost: false,
        point: 10,
      },
      {
        id: 2,
        idGame: '001',
        initialLetter: 'AN',
        name: 'Andres',
        gameMode: 'player',
        selectedCard: false,
        isHost: false,
        point: 8,
      }
    ]);
    const spy = jest.spyOn(mockWebSocketService, 'listenEvent').mockReturnValue(mockResponse);

    service.onUpdateRoom().subscribe(response => {
      expect(response).toBe([
        {
          id: 1,
          idGame: '001',
          initialLetter: 'Pl',
          name: 'Player1',
          gameMode: 'player',
          selectedCard: false,
          isHost: false,
          point: 10,
        },
        {
          id: 2,
          idGame: '001',
          initialLetter: 'AN',
          name: 'Andres',
          gameMode: 'player',
          selectedCard: false,
          isHost: false,
          point: 8,
        }
      ]);
      expect(spy).toHaveBeenCalledWith('update-players');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  // onNewPlayer()

  it('onNewPlayer: should call listenEvent on WebSocketService with "new-player" and return a new player', () => {
    const mockResponse = of({
      id: 1,
      idGame: '001',
      initialLetter: 'Pl',
      name: 'Player1',
      gameMode: 'player',
      selectedCard: false,
      isHost: false,
      point: 10,
    });
    const spy = jest.spyOn(mockWebSocketService, 'listenEvent').mockReturnValue(mockResponse);

    service.onNewPlayer().subscribe(response => {
      expect(response).toBe({
        id: 1,
        idGame: '001',
        initialLetter: 'Pl',
        name: 'Player1',
        gameMode: 'player',
        selectedCard: false,
        isHost: false,
        point: 10,
      });
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('new-player');
    });
  });

  // selectCard()

  it('selectCard: should call emitEvent on WebSocketService with "select-card" and the correct player object', () => {
    const mockPlayer: Player = {
      id: 1,
      idGame: '001',
      initialLetter: 'Pl',
      name: 'Player1',
      gameMode: 'player',
      selectedCard: false,
      isHost: false,
      point: 10,
    };
    const spy = jest.spyOn(mockWebSocketService, 'emitEvent').mockImplementation();

    service.selectCard(mockPlayer);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('select-card', mockPlayer);
  });

  // onUpdatePlayer()

  it('onUpdatePlayer: should listen for "update-player" events and return the correct player data', () => {
    const mockResponse = {
      id: 1,
      idGame: '001',
      initialLetter: 'Pl',
      name: 'Player1',
      gameMode: 'player',
      selectedCard: false,
      isHost: false,
      point: 10,
    };
    const spy = jest.spyOn(mockWebSocketService, 'listenEvent').mockReturnValue(of(mockResponse));

    service.onUpdatePlayer().subscribe(response => {
      expect(response).toBe(mockResponse);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('update-player');
    });
  });

  // onSelectedCard()

  it('onSelectedCard: should listen for "selected-card" events and return the correct game state data', () => {
    const mockResponse = {
      players: [
        {
          id: 1,
          idGame: '001',
          initialLetter: 'Pl',
          name: 'Player1',
          gameMode: 'player',
          selectedCard: false,
          isHost: false,
          point: 10,
        }
      ],
      admins: [
        {
          id: 1,
          idGame: '001',
          initialLetter: 'Pl',
          name: 'Player1',
          gameMode: 'player',
          selectedCard: false,
          isHost: false,
          point: 10,
        }
      ]
    };
    const spy = jest.spyOn(mockWebSocketService, 'listenEvent').mockReturnValue(of(mockResponse));

    service.onSelectedCard().subscribe(response => {
      expect(response).toBe(mockResponse);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('selected-card');
    });
  });

  // revealPoints()

  it('revealPoints: should emit "reveal-points" event with the correct parameters', () => {
    const isReveal = false,
    isAverage = false,
    isSelectedCards = false,
    isEndVotes = false;
    const spy = jest.spyOn(mockWebSocketService, 'emitEvent').mockImplementation();

    service.revealPoints(isReveal, isAverage, isSelectedCards, isEndVotes);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('reveal-points', { isReveal, isAverage, isSelectedCards, isEndVotes });
  });

  // onRevealPoints()

  it('onRevealPoints: should listen for "reveal-points" events and return the correct response', () => {
    const mockResponse = {
      isRevealPoints: false,
      isAverageSelected: false,
      isSelectCards: false,
      isEndVotes: false
    };
    const spy = jest.spyOn(mockWebSocketService, 'listenEvent').mockReturnValue(of(mockResponse));

    service.onRevealPoints().subscribe(response => {
      expect(response).toBe(mockResponse);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('reveal-points');
    });
  });

  // cardVotes()

  it('cardVotes: should emit "card-votes" event with the correct card votes data', () => {
    const mockCardVotes = {
      average: 5,
      votes: [2, 8]
    };
    const spy = jest.spyOn(mockWebSocketService, 'emitEvent').mockImplementation();

    service.cardVotes(mockCardVotes);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('card-votes', mockCardVotes);
  });

  // onCardVotes()

  it('onCardVotes: should listen for "card-votes" events and return the correct card votes data', () => {
    const mockResponse = {
      average: 5,
      votes: [2, 8]
    };
    const spy = jest.spyOn(mockWebSocketService, 'listenEvent').mockReturnValue(of(mockResponse));

    service.onCardVotes().subscribe(response => {
      expect(response).toBe(mockResponse);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('card-votes');
    });
  });

  // resetGame()

  it('resetGame: should emit "reset-game" event with the correct game reset data', () => {
    const players: Player[] = [
      { id: 1, idGame: '001', initialLetter: 'Pl', name: 'Player1', gameMode: 'player', selectedCard: false, isHost: false, point: 10 }
    ],
    scores = [
      { point: 0, selectedCard: false, hostSelectCard: false }
    ],
    selectedCards = [
      { point: 1, count: 1 }
    ],
    average = 1,
    isSelectCards = true,
    isRevealPoints = true,
    isCardsBlocked = true,
    isAverageSelected = true,
    isEndVotes = true;
    const spy = jest.spyOn(mockWebSocketService, 'emitEvent').mockImplementation();

    service.resetGame(players, scores, selectedCards, average, isSelectCards, isRevealPoints, isCardsBlocked, isAverageSelected, isEndVotes);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('reset-game', { players, scores, selectedCards, average, isSelectCards, isRevealPoints, isCardsBlocked, isAverageSelected, isEndVotes });
  });

  // onResetGame()

  it('onResetGame: should listen for "reset-game" events and return the correct game reset data', () => {
    const mockResponse = {
      players: [
        { id: 1, idGame: '001', initialLetter: 'Pl', name: 'Player1', gameMode: 'player', selectedCard: false, isHost: false, point: 10 }
      ],
      scores: [
        { point: 0, selectedCard: false, hostSelectCard: false }
      ],
      selectedCards: [
        { point: 1, count: 1 }
      ],
      average: 1,
      isSelectCards: true,
      isRevealPoints: true,
      isCardsBlocked: true,
      isAverageSelected: true,
      isEndVotes: true
    };
    const spy = jest.spyOn(mockWebSocketService, 'listenEvent').mockReturnValue(of(mockResponse));

    service.onResetGame().subscribe(response => {
      expect(response).toBe(mockResponse);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('reset-game');
    });
  });

  // onChangeMode()

  it('onChangeMode: should emit "change-mode" event with the correct player data', () => {
    const mockPlayer: Player = {
      id: 1,
      idGame: '001',
      initialLetter: 'Pl',
      name: 'Player1',
      gameMode: 'player',
      selectedCard: false,
      isHost: false,
      point: 10
    };
    const spy = jest.spyOn(mockWebSocketService, 'emitEvent').mockImplementation();

    service.onChangeMode(mockPlayer);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('change-mode', mockPlayer);
  });

  // onUpdateAdmins()

  it('onUpdateAdmins: should listen for "update-admins" events and return the correct admins data', () => {
    const mockResponse = [
      {
        id: 1,
        idGame: '001',
        initialLetter: 'Pl',
        name: 'Player1',
        gameMode: 'player',
        selectedCard: false,
        isHost: false,
        point: 10
      }
    ];
    const spy = jest.spyOn(mockWebSocketService, 'listenEvent').mockReturnValue(of(mockResponse));

    service.onUpdateAdmins().subscribe(response => {
      expect(response).toBe(mockResponse);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('update-admins');
    });
  });
});
