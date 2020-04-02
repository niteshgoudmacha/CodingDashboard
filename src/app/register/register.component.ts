import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  successMessage: string;
  isLoading: boolean = false;
  collegeNamesList: any;
  presentYearList: any;
  branchList: any;
  usernamesList: any;
  errorMessage: string = '';

  constructor(private authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { 
    this.registerForm = new FormGroup({
      fullname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      username: new FormControl(null, [Validators.required, this.usernameValidator.bind(this)]),
      password: new FormControl(null, Validators.required),
      cnfPassword: new FormControl(null, this.passwordValidator),
      hackerrankId: new FormControl(null, Validators.required),      
      codechefId: new FormControl(null),      
      codeforcesId: new FormControl(null),
      collegeName: new FormControl(null, Validators.required),
      branch: new FormControl(null, Validators.required),      
      presentYear: new FormControl(null, Validators.required)
    });

    this.collegeNamesList = [ "CMR College Of Engineering & Technology", "Others"];

    this.branchList = [ "CSE", "ECE", "EEE", "CIVIL", "OTHERS" ];

    this.presentYearList = [ 1, 2, 3 , 4 ];

    this.registerForm.controls.password.valueChanges
    .subscribe(
      x => this.registerForm.controls.cnfPassword.updateValueAndValidity()
    );
    this.usernamesList = [ 'abc', 'def' ];
  }

  ngOnInit(): void {
    if(this.authService.isAuth()) {
      this._router.navigate(['/']);
    }
    
  }

  isValid(controlName) {
    return this.registerForm.get(controlName).invalid && this.registerForm.get(controlName).touched;
  }

  passwordValidator(control: AbstractControl) {
    if(control && (control.value !== null || control.value !== undefined)) {
      const cnfPassword = control.value;

      const passwordControl = control.root.get('password');
      if(passwordControl) {
        const passwordValue = passwordControl.value;
        if(passwordValue !== cnfPassword || passwordValue === '') {
          return { isError: true };
        }
      }
    }
    return null;
  }

  usernameValidator(control: AbstractControl) {
    if(control && (control.value !== null || control.value !== undefined)) {
      const usernameControl = control.root.get('username');
      if(usernameControl) {
        const usernameValue = usernameControl.value;
        if(usernameValue === '') {
          this.errorMessage = 'Please choose a username';
          return { isError: true };
        }
        if(usernameValue && usernameValue.length < 6) {
          this.errorMessage = 'username should be atleast 6 characters long';
        }
        for(var i = 0; i < this.usernamesList.length; i++) {
          if(this.usernamesList[i] === usernameValue) {
            this.errorMessage = 'username already exists';
            return { isError: true };
          }
        }
      }
    }
    return null;
  }

  formValid() {
    return this.registerForm.valid;
  }

  moveToLogin() {
    this._router.navigate(['../login'], {relativeTo: this._activatedRoute});
  }

  register() {
    console.log(this.registerForm.value);
    // console.log(this.registerForm);
    this.isLoading = true;
    this.authService.submitRegister(this.registerForm.value)
    .subscribe(
      (data) => {
        this.isLoading = false;
        this.successMessage = 'Registered Successfully'
        this._router.navigate(['/login']);
      },
      (err) => {
        this.isLoading = false;
        this.successMessage = err.error.message
      }
    );
  }
}
