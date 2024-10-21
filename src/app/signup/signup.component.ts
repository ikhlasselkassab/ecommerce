import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  passwordsMatch: boolean = true;
  emailValid: boolean = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSignup() {

    if (this.signupForm.invalid) {
      console.log('Formulaire invalide');
      return;
    }

    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.passwordsMatch = false;
      console.log('Les mots de passe ne correspondent pas');
      return;
    }
    const emailControl = this.signupForm.get('email');
    if (emailControl?.invalid) {
      this.emailValid = false;
      console.log('L\'email doit être sous la forme d\'un email valide');
      return;
    }


    console.log('Formulaire soumis avec succès', this.signupForm.value);

  }
}
