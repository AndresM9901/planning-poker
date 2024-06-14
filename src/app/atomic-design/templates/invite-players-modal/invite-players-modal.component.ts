import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'templates-invite-players-modal',
  templateUrl: './invite-players-modal.component.html',
  styleUrl: './invite-players-modal.component.scss'
})
export class InvitePlayersModalComponent {

  @Input() urlValue: string = '';
  @Output() closeModal = new EventEmitter();
  @Output() copyText = new EventEmitter();

  inviteUrl = new FormControl('', []);


  constructor(private clipboardService: ClipboardService) { }

  closeInviteModal() {
    this.closeModal.emit()
  }

  copyToClipboard() {
    this.clipboardService.copy(this.urlValue);
    this.copyText.emit();
  }
}
