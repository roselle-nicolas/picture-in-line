import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'pil-form-message-errors-email',
  templateUrl: './form-message-errors-email.component.html',
  styleUrls: ['./form-message-errors-email.component.scss']
})
export class FormMessageErrorsEmailComponent {

  @Input() email: AbstractControl | null;

  constructor() { }

}
