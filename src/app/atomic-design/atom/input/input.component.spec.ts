import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Input() id

  it('id: should set id to empty string by default', () => {
    expect(component.id).toEqual('');
  });

  it('id: should set id to "input" string when provided', () => {
    const id = 'input';

    component.id = id;

    expect(component.id).toEqual(id);
  });

  // Input() name

  it('name: should set name to empty string by default', () => {
    expect(component.name).toEqual('');
  });

  it('name: should set name to "input" string when provided', () => {
    const name = 'input';

    component.name = name;

    expect(component.name).toEqual(name);
  });

  // Input() value

  it('value: should set value to empty string by default', () => {
    expect(component.value).toEqual('');
  });

  it('value: should set value to "Sprint 32" string when provided', () => {
    const value = 'Sprint 32';

    component.value = value;

    expect(component.value).toEqual(value);
  });

  // Input() placeholder

  it('placeholder: should set placeholder to empty string by default', () => {
    expect(component.placeholder).toEqual('');
  });

  it('placeholder: should set placeholder to "input" string when provided', () => {
    const placeholder = 'input';

    component.placeholder = placeholder;

    expect(component.placeholder).toEqual(placeholder);
  });

  // Input() type

  it('type: should set type to "text" by default', () => {
    expect(component.type).toEqual('text');
  });

  it('type: should set type to "password" when provided', () => {
    const type = 'password';

    component.type = type;

    expect(component.type).toEqual(type);
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

  // onInput

  // it('onInput: should call onInput when input value changes', () => {
  //   const mockEvent = { target: { value: 'Sprint 32' } };
  //   const spy1 = jest.spyOn(component.valueChange, 'emit');
  //   // const spy2 = jest.spyOn(component, 'registerOnChange');
  //   // const spy3 = jest.spyOn(component, 'registerOnTouched').mockImplementation();
  //   // const spy2 = jest.spyOn(component as any, 'onChange').mockImplementation();
  //   component['onChange'] = undefined;
  //   component['onTouched'] = undefined;

  //   component.onInput(mockEvent as any);

  //   expect(spy1).toHaveBeenCalledWith(mockEvent.target.value);
  //   // expect(spy2).not.toHaveBeenCalled();
  //   // expect(spy3).toHaveBeenCalled();
  // });

  it('onInput: should call onInput when input value changes', () => {
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
});
