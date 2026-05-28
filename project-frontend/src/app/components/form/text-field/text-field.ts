import { Component, input } from '@angular/core';

@Component({
  selector: 'app-text-field',
  imports: [],
  templateUrl: './text-field.html',
  styleUrl: './text-field.scss',
})
export class TextField {
  printedName = input.required<string>();
  formControlName = input.required<string>();
}
