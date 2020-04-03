import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  successMessage: String;
  isLoading: boolean = false;

  constructor(private authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { 
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    if(this.authService.isAuth()) {
      this._router.navigate(['/']);
    }
  }

  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  formValid() {
    return this.loginForm.valid;
  }

  login() {
    // console.log(this.loginForm.value);
    // console.log(this.loginForm.valid);
    this.isLoading = true;
    this.authService.login(this.loginForm.value)
    .subscribe(
      (data) => {
        this.isLoading = false;
        localStorage.setItem('token', data.toString());
        this.successMessage = 'Login Successful'
        this._router.navigate(['/'], {relativeTo: this._activatedRoute});
      },
      (err) => {
        console.log('error = ', err);
        this.isLoading = false;
        this.successMessage = err.error.message;
      }
    );
  }

  moveToRegister() {
    this._router.navigate(['../register'], {relativeTo: this._activatedRoute});
  }
}
