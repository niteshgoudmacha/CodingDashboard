import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-create-contest',
  templateUrl: './create-contest.component.html',
  styleUrls: ['./create-contest.component.css']
})
export class CreateContestComponent implements OnInit {

  contestForm: FormGroup;
  successMessage: String;
  isLoading: boolean = false;
  isInvalidEndTime: boolean = false;

  constructor(private authService: AuthService,
    private dataService: DataserviceService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { 
    this.contestForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      url: new FormControl(null, Validators.required),
      startTime: new FormControl(null, Validators.required),
      endTime: new FormControl(null, Validators.required),
      platform: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    // if(this.authService.isAuth()) {
    //   this._router.navigate(['/']);
    // }
  }

  isValid(controlName) {
    return this.contestForm.get(controlName).invalid && this.contestForm.get(controlName).touched;
  }

  formValid() {
    return this.contestForm.valid;
  }

  addContest() {
    console.log(this.contestForm.value);
    if((new Date(this.contestForm.value.startTime) >= new Date(this.contestForm.value.endTime))) {
      this.successMessage = 'Invalid EndTime'
      return ;
    }
    this.successMessage = 'Invalid EndTime'
    // console.log(this.contestForm.valid);
    this.isLoading = true;
    this.dataService.addContest(this.contestForm.value)
    .subscribe(
      (data) => {
        this.isLoading = false;
        this.successMessage = 'Added Successful'
        this._router.navigate(['/dashboard'], {relativeTo: this._activatedRoute});
      },
      (err) => {
        console.log('error = ', err);
        this.isLoading = false;
        this.successMessage = err.error.message;
      }
    );
  }

  moveToDashboard() {
    this._router.navigate(['../dashboard'], {relativeTo: this._activatedRoute});
  }
}
