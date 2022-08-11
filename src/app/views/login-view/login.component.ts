import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from 'src/app/services/user.service.ts';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userlogin = true;
  userregister = false;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _service: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });

    this.registerForm = this._formBuilder.group({
      email: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      password: [null, Validators.required],
      identification: [null, Validators.required],
    });
  }

  user_register() {
    this.userlogin = false;
    this.userregister = true;
  }
  user_login() {
    this.userlogin = true;
    this.userregister = false;
  }

  login() {
    this.loading = true;
    // Return if the form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loginForm.value.password = CryptoJS.AES.encrypt(
      this.loginForm.value.password,
      'password'
    ).toString();
    this.loginForm.disable();
    this._service.signIn(this.loginForm.value).subscribe(
      (Ok) => {
        this.loading = false;
        if (Ok.accessToken != null) {
          localStorage.setItem('userModel', JSON.stringify(Ok));
          if (Ok.changePassword) {
            const redirectURL =
              this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
              '/changePassword';
            this._route.navigateByUrl(redirectURL);
          } else {
            const redirectURL =
              this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
              '/signed-in-redirect';
            this._route.navigateByUrl(redirectURL);
          }
        }
      },
      (Response) => {
        this.loginForm.enable();
        this.loading = false;
        this.showMessage(Response.error.message, 'error');
      }
    );
  }

  register() {
    this.loading = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.registerForm.value.password = CryptoJS.AES.encrypt(
      this.loginForm.value.password,
      'password'
    ).toString();
    this.registerForm.disable();
    this._userService.addOrUpdate(this.registerForm.value).subscribe(
      (Ok) => {
        this.showMessage('Creación de usuario correcta', 'success');
        this.loading = false;
        this.userregister = false;
        this.userlogin = true;
      },
      (Response) => {
        this.loginForm.enable();
        this.loading = false;
        this.showMessage(Response.error.message, 'error');
      }
    );
  }

  showMessage(text: string, icon: any) {
    swal
      .fire({
        text: text,
        icon: icon,
      })
      .then((result) => {});
  }
}
