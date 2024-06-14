import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'atom-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() formControl: FormControl;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() required: boolean = true;

  @Output() valueChange = new EventEmitter<string>();

  private onChange?: (value: any) => void | undefined;
  private onTouched?: () => void | undefined;

  constructor() {
    this.formControl = new FormControl('');
  }

  writeValue(value: any): void {
    this.formControl.setValue(value);
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
