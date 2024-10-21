import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {AuthService} from '../services/auth.service';





@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent  {
  email = new FormControl('');
  password = new FormControl('');
  user: any;

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.email.value!, this.password.value!)
      .then(userCredential => {
        this.user = userCredential.user;
      })
      .catch(error => console.error(error));
  }

  logout() {
    this.authService.logout().then(() => {
      this.user = null;
    });
  }

  ngOnInit(): void {
  }
}
