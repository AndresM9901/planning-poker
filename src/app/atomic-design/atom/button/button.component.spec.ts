import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    component.text = '';
    component.value = '';
    component.type = 'button';
    component.disabled = false;
    component.typeUse = 'form';
    component.revealPoints = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Input() text

  it('text: should set text to empty string by default', () => {
    expect(component.text).toEqual('');
  });

  it('text: should set text to "click me" string when provided', () => {
    const text = 'click me';

    component.text = text;

    expect(component.text).toEqual(text);
  });

  // Input() type

  it('type: should default type to "button" when not provided', () => {
    expect(component.type).toEqual('button');
  });

  it('type: should set type to "submit" when provided', () => {
    const type = 'submit';

    component.type = type;

    expect(component.type).toEqual(type);
  });

  // Input() value

  it('value: should default value to empty string by default', () => {
    expect(component.value).toEqual('');
  });

  it('value: should set value to "click me" string when provided', () => {
    const value = 'click me';

    component.value = value;

    expect(component.value).toEqual(value);
  });

  // Input() disabled

  it('disabled: should default disabled to false by default', () => {
    expect(component.disabled).toEqual(false);
  });

  it('disabled: should set disabled to true when provided', () => {
    const disabled = true;

    component.disabled = disabled;

    expect(component.disabled).toEqual(disabled);
  });

  // Input() typeUse

  it('typeUse: should default typeUse to "form" when not provided', () => {
    expect(component.typeUse).toEqual('form');
  });

  it('typeUse: should set typeUse to "table" when provided', () => {
    const type = 'table';

    component.typeUse = type;

    expect(component.typeUse).toEqual(type);
  });

  it('typeUse: should set typeUse to "profile" when provided', () => {
    const type = 'profile';

    component.typeUse = type;

    expect(component.typeUse).toEqual(type);
  });

  it('typeUse: should set typeUse to "permission" when provided', () => {
    const type = 'permission';

    component.typeUse = type;

    expect(component.typeUse).toEqual(type);
  });
});


