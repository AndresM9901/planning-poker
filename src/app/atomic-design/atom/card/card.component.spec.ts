import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Input() name

  it('name: should set name to empty string by default', () => {
    expect(component.name).toEqual('');
  });

  it('name: should set name to "click me" string when provided', () => {
    const name = 'click me';

    component.name = name;

    expect(component.name).toEqual(name);
  });

  // Input() typeCard

  it('typeCard: should default typeCard to "player" when not provided', () => {
    expect(component.typeCard).toEqual('player');
  });

  it('typeCard: should set typeCard to "viewer" when provided', () => {
    const typeCard = 'viewer';

    component.typeCard = typeCard;

    expect(component.typeCard).toEqual(typeCard);
  });

  it('typeCard: should set typeCard to "card-point" when provided', () => {
    const typeCard = 'card-point';

    component.typeCard = typeCard;

    expect(component.typeCard).toEqual(typeCard);
  })

  it('typeCard: should set typeCard to "point-reveal" when provided', () => {
    const typeCard = 'point-reveal';

    component.typeCard = typeCard;

    expect(component.typeCard).toEqual(typeCard);
  });

  // Input() initialLetter

  it('initialLetter: should set initialLetter to empty string by default', () => {
    expect(component.initialLetter).toEqual('');
  });

  it('initialLetter: should set initialLetter to "AN" string when provided', () => {
    const initialLetter = 'AN';

    component.initialLetter = initialLetter;

    expect(component.initialLetter).toEqual(initialLetter);
  });

  // Input() number

  it('number: should set number to empty string by default', () => {
    expect(component.number).toEqual('');
  });

  it('number: should set number to "1" number when provided', () => {
    const number = 1;

    component.number = number;

    expect(component.number).toEqual(number);
  });

  it('number: should set number to "?" string when provided', () => {
    const number = '?';

    component.number = number;

    expect(component.number).toEqual(number);
  });

  // Input() selectedCard

  it('selectedCard: should default selectedCard to false by default', () => {
    expect(component.selectedCard).toEqual(false);
  });

  it('selectedCard: should set selectedCard to true when provided', () => {
    const selectedCard = true;

    component.selectedCard = selectedCard;

    expect(component.selectedCard).toEqual(selectedCard);
  });

  // Input() revealPoint

  it('revealPoint: should default revealPoint to false by default', () => {
    expect(component.revealPoint).toEqual(false);
  });

  it('revealPoint: should set revealPoint to true when provided', () => {
    const revealPoint = true;

    component.revealPoint = revealPoint;

    expect(component.revealPoint).toEqual(revealPoint);
  });

  // Input() selectedCards

  it('selectedCards: should default selectedCards to false by default', () => {
    expect(component.selectedCards).toEqual(false);
  });

  it('selectedCards: should set selectedCards to true when provided', () => {
    const selectedCards = true;

    component.selectedCards = selectedCards;

    expect(component.selectedCards).toEqual(selectedCards);
  })
});
