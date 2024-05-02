import { Component, Input } from '@angular/core';

@Component({
  selector: 'atom-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  @Input() message: string = "";
}
