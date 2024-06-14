import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GivePermissionService } from '../../../services/givePermission/give-permission.service';

@Component({
  selector: 'template-give-permission-modal',
  templateUrl: './give-permission-modal.component.html',
  styleUrl: './give-permission-modal.component.scss'
})
export class GivePermissionModalComponent {
  @Input() selectedPlayer: any;
  @Input() show: boolean = false;

  @Output() modalClosed = new EventEmitter<boolean>();

  constructor(private givePermissionService: GivePermissionService) {}

  openModalPlayer(player: any) {
    this.selectedPlayer = player;
    this.show = true;
  }

  closeModal() {
    this.show = false;
    this.modalClosed.emit(this.show);
  }


  assignAdministratorRole() {
    this.givePermissionService.giveAdminRoleToThePlayer(this.selectedPlayer);
    this.closeModal();
  }
}
