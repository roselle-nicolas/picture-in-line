import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'pil-form-message-errors-pseudo',
  templateUrl: './form-message-errors-pseudo.component.html',
  styleUrls: ['./form-message-errors-pseudo.component.scss']
})
export class FormMessageErrorsPseudoComponent {

  @Input() pseudo: AbstractControl | null;

  constructor() { }

  

}
