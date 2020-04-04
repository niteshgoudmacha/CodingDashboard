import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  feedbackForm: FormGroup;
  successMessage: String;
  isLoading: boolean = false;

  constructor(private authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { 
    this.feedbackForm = new FormGroup({
      message: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    if(!this.authService.isAuth()) {
      this._router.navigate(['/']);
    }
  }

  isValid(controlName) {
    return this.feedbackForm.get(controlName).invalid && this.feedbackForm.get(controlName).touched;
  }

  formValid() {
    return this.feedbackForm.valid;
  }

  send() {
    // console.log(this.loginForm.value);
    // console.log(this.feedbackForm.value);  
    this.isLoading = true;
    this.authService.sendFeedback(this.feedbackForm.value).subscribe(
      (data) => {
        this.isLoading = false;
        this.successMessage = 'Sent Successfully'
      },
      (err) => {
        console.log('error = ', err);
        this.isLoading = false;
        this.successMessage = err.error.message;
      }
    );
  }

}
