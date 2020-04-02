import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any;
  updateForm: any;
  isEditMode: boolean = false;
  presentYearList: any;
  successMessage: string = '';
  messageColor: string = '';

  constructor(private authService: AuthService,
    private _router: Router) { 
    
    this.presentYearList = [ 1, 2, 3 , 4 ];
    this.profile = {
      fullname: '',
      codechefId: '',
      hackerrankId: '',
      codeforcesId: ''
    };

    if(!this.authService.isAuth()) {
      this._router.navigate(['/']);
    }

    
  }

  ngOnInit(): void {
    if(!this.authService.isAuth()) {
      this._router.navigate(['/']);
    }
    this.authService.getProfile()
      .subscribe((profile) => {
        console.log(profile);
        this.profile = profile;
        // localStorage.setItem('userProfile', JSON.stringify(profile));
      },
      (err) => {
        console.log(err);
      });
  }

  editModeOn() {
    this.isEditMode = true;
    // this.profile = JSON.parse(localStorage.getItem('userProfile'));
  }

  updateProfile() {
    if(this.profile.fullname === '') {
      this.successMessage = 'Name Should Not Be Empty';
      this.messageColor = 'bg-warning'
      return ;
    }
    if(this.profile.hackerrankId === '') {
      this.successMessage = 'Hackerrank Handle Should Not Be Empty';
      this.messageColor = 'bg-warning'
      return ;
    }
    if(this.profile.codechefId === '') {
      this.successMessage = 'codechef Handle Should Not Be Empty';
      this.messageColor = 'bg-warning'
      return ;
    }
    this.authService.updateProfile(this.profile).subscribe((profile) => {
      this.profile = profile;
      this.successMessage = "Updated Successfully";
      this.messageColor = 'bg-success'
      this.isEditMode = false;
      this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this._router.navigate(['/profile']);
    }); 
    },
    (err) => {
      this.successMessage = err.error.message;
      this.messageColor = 'bg-danger'
      this.isEditMode = false;
    })
  }

}
