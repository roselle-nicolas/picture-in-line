import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'pil-form-message-errors-password',
  templateUrl: './form-message-errors-password.component.html',
  styleUrls: ['./form-message-errors-password.component.scss']
})
export class FormMessageErrorsPasswordComponent{

  panelOpenState = false;

  @Input() password: AbstractControl | null;

  constructor() { }

}
