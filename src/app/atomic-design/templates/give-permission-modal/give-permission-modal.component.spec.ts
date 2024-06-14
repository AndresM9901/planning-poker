import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GivePermissionModalComponent } from './give-permission-modal.component';
import { GivePermissionService } from '../../../services/givePermission/give-permission.service';
import { ButtonComponent } from '../../atom/button/button.component';
import { Player } from '../../../config/interfaces/player.interface';


describe('GivePermissionModalComponent', () => {
  let component: GivePermissionModalComponent;
  let fixture: ComponentFixture<GivePermissionModalComponent>;
  let givePermissionService: GivePermissionService;
  let mockPermissionService = {
    response: '',
    giveAdminRoleToThePlayer: jest.fn()
  }
  let mockSelectedPlayer = {
    name: 'Player 1'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GivePermissionModalComponent,
        ButtonComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: GivePermissionService, useValue: mockPermissionService }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GivePermissionModalComponent);
    givePermissionService = fixture.debugElement.injector.get(GivePermissionService);
    component = new GivePermissionModalComponent(givePermissionService);
    component = fixture.componentInstance;
    component.selectedPlayer = mockSelectedPlayer;
    component.show = false;
    fixture.detectChanges();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Input() selectedPlayer

  it('selectedPlayer: should set selectedPlayer to object when provided', () => {
    expect(component.selectedPlayer).toEqual(mockSelectedPlayer);
  });

  // Input() show

  it('show: should set show to false by default', () => {
    expect(component.show).toEqual(false);
  });

  it('show: should set show to true when provided', () => {
    const show = true;

    component.show = show;

    expect(component.show).toEqual(show);
  });

  // Output() modalClosed

  it('modalClosed: should emit true when called', () => {
    const spy = jest.spyOn(component.modalClosed, 'emit');
    const mockShow = true;

    component.modalClosed.emit(mockShow);

    expect(spy).toHaveBeenCalledWith(mockShow);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  // openModalPlayer

  it('openModalPlayer: should set show to true when called', () => {
    const player = {
      name: 'Player 1'
    };
    const show = true;

    component.openModalPlayer(player);

    expect(component.show).toEqual(show);
    expect(component.selectedPlayer).toEqual(player);
  });

  // closeModal

  it('closeModal: should set show to false when called', () => {
    const show = false;
    const spy = jest.spyOn(component.modalClosed, 'emit');

    component.closeModal();

    expect(component.show).toEqual(show);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  // assignAdministratorRole

  it('assignAdministratorRole: should call giveAdminRoleThePlayer when called', () => {
    const spy1 = jest.spyOn(mockPermissionService, 'giveAdminRoleToThePlayer').mockImplementation();
    const spy2 = jest.spyOn(component, 'closeModal').mockImplementation();
    const player = {
      name: 'Player 1'
    }

    component.assignAdministratorRole();

    expect(spy1).toHaveBeenCalledWith(player);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  })
});
