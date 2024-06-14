import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitePlayersModalComponent } from './invite-players-modal.component';
import { FormControl } from '@angular/forms';
import { InputComponent } from '../../atom/input/input.component';
import { ButtonComponent } from '../../atom/button/button.component';
import { ClipboardService } from 'ngx-clipboard';

describe('InvitePlayersModalComponent', () => {
  let component: InvitePlayersModalComponent;
  let fixture: ComponentFixture<InvitePlayersModalComponent>;
  let clipboardService: ClipboardService;
  let mockClipboard = {
    copy: (value: string) => {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InvitePlayersModalComponent,
        InputComponent,
        ButtonComponent
      ],
      imports: [],
      providers: [
        {
          provide: ClipboardService,
          useValue: mockClipboard
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitePlayersModalComponent);
    component = fixture.componentInstance;
    component.inviteUrl = new FormControl('', []);
    clipboardService = fixture.componentRef.injector.get(ClipboardService);
    component.urlValue = '';
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // @Output() closeModal

  it('closeModal: should emit when called', () => {
    const spy1 = jest.spyOn(component.closeModal, 'emit');

    component.closeModal.emit();

    expect(spy1).toHaveBeenCalledTimes(1);
  });

  // @Output() copyText

  it('copyText: should emit when called', () => {
    const spy1 = jest.spyOn(component.copyText, 'emit');

    component.copyText.emit();

    expect(spy1).toHaveBeenCalledTimes(1);
  });

  // closeInviteModal

  it('closeInviteModal: should emit when called', () => {
    const spy1 = jest.spyOn(component.closeModal, 'emit');

    component.closeInviteModal();

    expect(spy1).toHaveBeenCalledTimes(1);
  });

  // copyToClipboard

  it('copyToClipboard: should copy text to clipboard and emit copyText event', () => {
    component.urlValue = 'test value';
    const spy1 = jest.spyOn(mockClipboard, 'copy').mockImplementation();
    const spy2 = jest.spyOn(component.copyText, 'emit').mockImplementation();

    component.copyToClipboard();

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy1).toHaveBeenCalledWith(component.urlValue);
    expect(spy2).toHaveBeenCalledTimes(1);
  });
});
