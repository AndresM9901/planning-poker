import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Input() message

  it('message: should set message to empty string by default', () => {
    expect(component.message).toEqual('');
  });

  it('message: should set message to "click me" string when provided', () => {
    const message = 'click me';

    component.message = message;

    expect(component.message).toEqual(message);
  })
});
