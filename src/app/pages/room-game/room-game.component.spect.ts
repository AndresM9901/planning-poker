import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomGameComponent } from './room-game.component';

describe('RoomGameComponent', () => {
  let component: RoomGameComponent;
  let fixture: ComponentFixture<RoomGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
