import { Component, Input } from '@angular/core';

@Component({
  selector: 'atom-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  public revealPoints: boolean = false;

  @Input() text: string = '';
  @Input() type: string = 'button';
  @Input() value: string = '';
  @Input() disabled: boolean = false;
  @Input() typeUse: 'form' | 'table' | 'profile' | 'permission' = 'form';
}
