import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { isPasswordValid } from 'src/app/shared/validators/isPasswordValid';

@Component({
  selector: 'pil-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit, OnDestroy {

  //stepper
  pseudoRegisterForm: FormGroup;
  emailRegisterForm: FormGroup;
  passwordRegisterForm: FormGroup;
  
  hide = true;
  isSmallScreen: boolean;
  subsription: Subscription

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    
    // téléphone mode portrait?
    this.listenSmallScreenPortrait();

    this.pseudoRegisterForm = this.fb.group({
      'pseudo': ['',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9A-Z\d@àéèç'ê-]*$/)
      ]]
    });
    this.emailRegisterForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]]
    });
    this.passwordRegisterForm = this.fb.group({
      'password': ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(18),
        isPasswordValid
      ]]
    });
  }
 
  get pseudo() { return this.pseudoRegisterForm.get('pseudo') as FormControl};
  get email() { return this.emailRegisterForm.get('email') as FormControl};
  get password() { return this.passwordRegisterForm.get('password') as FormControl};

  submit(): void {
    this.authService.register(this.pseudo?.value, this.email?.value, this.password?.value).subscribe();
  }

  ngOnDestroy(): void {
    this.subsription.unsubscribe();
  }

  listenSmallScreenPortrait(): void {
    this.subsription = this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web,
    ]).subscribe(
      result => {
        const hansetBreakpointPortrait = Breakpoints.Handset.split(',')[0]
        this.isSmallScreen = result.breakpoints[hansetBreakpointPortrait];
      }
    )
  }
}
