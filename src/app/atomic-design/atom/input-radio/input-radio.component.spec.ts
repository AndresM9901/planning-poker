import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRadioComponent } from './input-radio.component';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';

describe('InputRadioComponent', () => {
  let component: InputRadioComponent;
  let fixture: ComponentFixture<InputRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputRadioComponent],
      imports: [ReactiveFormsModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputRadioComponent);
    component = fixture.componentInstance;
    component.formControl = new FormControl();
    component.name = '';
    component.placeholder = '';
    component.required = true;
    component.formControl.setValue('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Input() name
  it('name: should set name to empty string by default', () => {
    expect(component.name).toEqual('');
  });

  it('name: should set name to "input-radio" string when provided', () => {
    const name = 'input-radio';

    component.name = name;

    expect(component.name).toEqual(name);
  });

  // Input() value
  it('value: should set value to empty string by default', () => {
    expect(component.value).toEqual('');
  });

  it('value: should set value to "player" string when provided', () => {
    const value = 'player';

    component.value = value;

    expect(component.value).toEqual(value);
  });

  // Input() placeholder
  it('placeholder: should set placeholder to empty string by default', () => {
    expect(component.placeholder).toEqual('');
  });

  it('placeholder: should set placeholder to "input-radio" string when provided', () => {
    const placeholder = 'input-radio';

    component.placeholder = placeholder;

    expect(component.placeholder).toEqual(placeholder);
  });

  // Input() required
  it('required: should set required to true by default', () => {
    expect(component.required).toEqual(true);
  });

  it('required: should set required to false when provided', () => {
    const required = false;

    component.required = required;

    expect(component.required).toEqual(required);
  });

  // Input() defaultChecked
  it('defaultChecked: should set defaultChecked to false by default', () => {
    expect(component.defaultChecked).toEqual(false);
  });

  it('defaultChecked: should set defaultChecked to true when provided', () => {
    const defaultChecked = true;

    component.defaultChecked = defaultChecked;

    expect(component.defaultChecked).toEqual(defaultChecked);
  });

  // Output() valueChange
  it('valueChange: should emit value when provided', () => {
    const spy1 = jest.spyOn(component.valueChange, 'emit');

    component.valueChange.emit('sprint 32');

    expect(spy1).toHaveBeenCalledWith('sprint 32');
  });

  // writeValue()

  it('writeValue: should change the value of the formControl if the input value is different', () => {
    const mockEvent = { target: { value: 'player' } };

    component.writeValue(mockEvent.target.value);

    expect(component.formControl.value).toBe(mockEvent.target.value);
  });

  it('writeValue: should not change the value of the formControl if the input value is not different', () => {
    const mockEvent = { target: { value: 'player' } };
    component.formControl.setValue('player');

    component.writeValue(mockEvent.target.value);

    expect(component.formControl.value).toBe('player');
  });

  // onInput()
  it('onInput: should call onInput when the input value changes and initializes "onChange" and "onTouched"', () => {
    const mockEvent = { target: { value: 'Sprint 32' } };
    const spy1 = jest.spyOn(component.valueChange, 'emit');
    component['onChange'] = (value: any) => {};
    component['onTouched'] = () => {};
    const spy2 = jest.spyOn(component as any, 'onChange').mockImplementation();
    const spy3 = jest.spyOn(component as any, 'onTouched').mockImplementation();

    component.onInput(mockEvent as any);

    expect(spy1).toHaveBeenCalledWith(mockEvent.target.value);
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });

  it('onInput: should call onInput when the input value changes and "onChange" and "onTouched" are not initialized.', () => {
    const mockEvent = { target: { value: 'Sprint 32' } };
    const spy1 = jest.spyOn(component.valueChange, 'emit');

    component['onChange'] = undefined;
    component['onTouched'] = undefined;

    component.onInput(mockEvent as any);

    expect(spy1).toHaveBeenCalledWith(mockEvent.target.value);
  });
});
