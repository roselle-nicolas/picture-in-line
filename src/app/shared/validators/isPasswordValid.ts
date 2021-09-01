import { AbstractControl, ValidationErrors } from "@angular/forms";

export const isPasswordValid = (control: AbstractControl): ValidationErrors | null => {

    let uppercase = false
    let lowercase = false
    let digits = false
    let symbols = false

    let isPasswordValid: boolean = true;

    if (!/(?=.*[A-Z])/.test(control.value)) {
      uppercase = true;
      isPasswordValid = false;
    }
    if (!/(?=.*[a-z])/.test(control.value)) {
      lowercase = true;
      isPasswordValid = false;
    }
    if (!/(?=.*\d)/.test(control.value)) {
      digits = true;
      isPasswordValid = false;
    }
    if (!/(?=.*[@$!%*#?&.-])/.test(control.value)) {
      digits = true;
      isPasswordValid = false;
    }
    if (!/^(?=.*[@$!%*#?&.-])[A-Za-z\d@$!%*#?&.-]*$/.test(control.value)) {
      symbols = true;
      isPasswordValid = false;
    }

    return !isPasswordValid? {uppercase, lowercase, digits, symbols} : null;
}