import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { CreateUserComponent } from './create-user.component';
import { SharedService } from '../../../shared/services/shared.service';
import { CreatePlayerService } from '../../../services/create-player/create-player.service';
import { Player } from '../../../config/interfaces/player.interface';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let sharedService: SharedService;
  let FormBuilder: FormBuilder;
  let createPlayerService: CreatePlayerService;
  let mockCreatePlayerService = {
    addPlayer: (newPlayer: Player) => {},
    joinGame: (newPlayer: Player) => {},
    createPlayerSession: (newPlayer: Player) => {},
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
      providers: [
        { provide: CreatePlayerService, useValue: mockCreatePlayerService },
      ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    sharedService = fixture.debugElement.injector.get(SharedService);
    FormBuilder = fixture.debugElement.injector.get(FormBuilder);
    createPlayerService = fixture.debugElement.injector.get(CreatePlayerService);
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
});
