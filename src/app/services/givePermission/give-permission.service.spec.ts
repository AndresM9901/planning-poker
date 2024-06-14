import { TestBed } from '@angular/core/testing';

import { GivePermissionService } from './give-permission.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Player } from '../../config/interfaces/player.interface';

describe('GivePermissionService', () => {
  let service: GivePermissionService;
  let mockHttp: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClientTestingModule,
          useValue: mockHttp
        }
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(GivePermissionService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    mockHttp.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // giveAdminRoleToThePlayer(player: Player)

  it('should send a POST request and update response$', () => {
    const mockPlayer: Player = {
      id: 1,
      idGame: 'game1',
      initialLetter: 'A',
      name: 'John Doe',
      gameMode: 'player',
      selectedCard: false,
      isHost: false,
      point: 0
    };

    const mockResponse = { success: true };

    service.giveAdminRoleToThePlayer(mockPlayer);

    const req = mockHttp.expectOne('http://localhost:3001/add-admin');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      id: mockPlayer.id,
      name: mockPlayer.name,
      gameMode: mockPlayer.gameMode,
      selectedCard: mockPlayer.selectedCard,
      isHost: mockPlayer.isHost,
      point: mockPlayer.point,
      initialLetter: mockPlayer.initialLetter,
      idGame: mockPlayer.idGame
    });

    req.flush(mockResponse);

    service.response$.subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
  });
});
