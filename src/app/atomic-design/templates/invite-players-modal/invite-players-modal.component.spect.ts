import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitePlayersModalComponent } from './invite-players-modal.component';

describe('InvitePlayersModalComponent', () => {
  let component: InvitePlayersModalComponent;
  let fixture: ComponentFixture<InvitePlayersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvitePlayersModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvitePlayersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
