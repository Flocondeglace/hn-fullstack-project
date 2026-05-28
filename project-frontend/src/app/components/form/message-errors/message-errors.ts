import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-message-errors',
  standalone: true,
  imports: [],
  templateUrl: './message-errors.html',
})
export class MessageErrors {
  control = input.required<AbstractControl>();
  // Control name for unique error message
  name = input<string>('');
}
