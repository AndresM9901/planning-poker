import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoomComponent } from './create-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../../shared/services/shared/shared.service';
import { RoomService } from '../../services/room/room.service';
import { Router } from '@angular/router';
import { WebSocketService } from '../../services/web-socket/web-socket.service';

describe('CreateRoomComponent', () => {
  let component: CreateRoomComponent;
  let fixture: ComponentFixture<CreateRoomComponent>;
  let sharedService: SharedService;
  let roomService: RoomService;
  let router: Router;

  const mockRouter = {
    navigate: () => {},
    url: "/room-game/1234"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRoomComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        SharedService,
        RoomService,
        WebSocketService,
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    sharedService = fixture.debugElement.injector.get(SharedService);
    roomService = fixture.debugElement.injector.get(RoomService);
    router = fixture.debugElement.injector.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('roomNameControl: Should return invalid formcontrol when input is empty', () => {
    let nameRoom = component.roomNameControl;
    nameRoom.setValue('');

    expect(nameRoom.invalid).toBeTruthy();
  });
});
