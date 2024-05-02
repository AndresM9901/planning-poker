import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';

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


  constructor(private renderer: Renderer2) { }

  closeInviteModal() {
    this.closeModal.emit()
  }

  copyToClipboard(value: string) {
    const textarea = this.renderer.createElement('textarea');
    this.renderer.setProperty(textarea, 'value', value);
    this.renderer.appendChild(document.body, textarea);
    textarea.select();
    document.execCommand('copy');
    this.renderer.removeChild(document.body, textarea);
    this.copyText.emit();
  }
}
