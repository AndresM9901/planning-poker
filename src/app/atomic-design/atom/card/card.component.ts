import { Component, Input } from '@angular/core';

@Component({
  selector: 'atom-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() name: string = '';
  @Input() typeCard: 'player' | 'viewer' | 'card-point' | 'point-reveal' = 'player';
  @Input() initialLetter: string = '';
  @Input() number: string | number = '';
  @Input() selectedCard: boolean = false;
  @Input() revealPoint: boolean = false;
  @Input() selectedCards: boolean = false;
}
