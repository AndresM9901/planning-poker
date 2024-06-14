import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'atom-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrl: './input-radio.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRadioComponent),
      multi: true,
    }
  ],
})
export class InputRadioComponent implements ControlValueAccessor {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = true;
  @Input() defaultChecked: boolean = false;
  @Input() formControl!: FormControl;
  @Output() valueChange = new EventEmitter<string>();

  private onChange?: (value: any) => void;
  private onTouched?: () => void;

  constructor() {}

  writeValue(value: any): void {
    if (this.formControl.value !== value) {
      this.formControl.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;

    this.valueChange.emit(inputValue);

    if(this.onChange) {
      this.onChange(inputValue);
    }

    if(this.onTouched) {
      this.onTouched();
    }
  }
}
