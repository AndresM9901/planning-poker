import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GivePermissionModalComponent } from './give-permission-modal.component';
import { GivePermissionService } from '../../../services/givePermission/give-permission.service';
import { ButtonComponent } from '../../atom/button/button.component';


describe('GivePermissionModalComponent', () => {
  let component: GivePermissionModalComponent;
  let fixture: ComponentFixture<GivePermissionModalComponent>;
  let givePermissionService: GivePermissionService;
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
      providers: [GivePermissionService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GivePermissionModalComponent);
    component = fixture.componentInstance;
    component.selectedPlayer = mockSelectedPlayer;
    givePermissionService = fixture.debugElement.injector.get(GivePermissionService);
    fixture.detectChanges();
  })

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
  });

  // openModalPlayer
});
