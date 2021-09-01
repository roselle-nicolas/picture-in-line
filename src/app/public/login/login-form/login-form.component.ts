import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { isPasswordValid } from 'src/app/shared/validators/isPasswordValid';

@Component({
  selector: 'pil-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  hide: boolean;
  isLoginByPseudo: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.hide = true;
    this.isLoginByPseudo = true;

    this.createLoginForm()
    this.loginByPseudo()
  }

  get pseudo() { return this.loginForm.get('pseudo') as FormControl};
  get email() { return this.loginForm.get('email') as FormControl};
  get password() { return this.loginForm.get('password') as FormControl};

  createLoginForm(): void {
    this.loginForm = this.fb.group(
      {
        'password': ['', [
        Validators.minLength(8),
        Validators.maxLength(18),
        isPasswordValid
        ]]
      }
    );
  }

  emailControl(): FormControl {
    return this.fb.control('', [
      Validators.required,
      Validators.email
    ])
  }
  
  pseudoControl(): FormControl {
    return this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9A-Z\d@àéèç'ê-]*$/)
    ])
  }

  loginByEmail(): void {
    this.isLoginByPseudo = false;
    this.loginForm.removeControl('pseudo');
    this.loginForm.addControl('email', this.emailControl());
  }

  loginByPseudo(): void {
    this.isLoginByPseudo = true;
    if (this.loginForm.contains('email')) {
      this.loginForm.removeControl('email');
    }
    this.loginForm.addControl('pseudo', this.pseudoControl())
  }

  submit(): void {
    const username = this.isLoginByPseudo? this.pseudo.value: this.email.value;
    this.authService.login(username, this.password.value).subscribe(
      _ => this.router.navigate(['/picinline/album']),
      _ => this.loginForm.reset()
    )
  }

}
