import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { DataserviceService } from '../dataservice.service';

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
  profileImage: string = '';
  // line chart
  Contest = [];  
  Rating = [];  
  Linechart = [];  
  // --- line chart --- 


  constructor(private authService: AuthService,
    private dataService: DataserviceService,
    private _router: Router,
    private httpClient: HttpClient) { 
    
    this.presentYearList = [ 1, 2, 3 , 4 ];
    this.profile = {
      fullname: '',
      codechefId: '',
      hackerrankId: '',
      codeforcesId: '',
      motto: ''
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
      this.generateRatingsGraph();
  }

  generateRatingsGraph() {

    this.dataService.getUserRatings().subscribe((contests) => {
      // for(var i: contests)
      this.Contest.push("Initail");
      this.Rating.push("1500");
      contests['contestsList'].forEach(element => {
        console.log(element);
        this.Contest.push(element.contestName);
        this.Rating.push(element.rating);
      });

      this.Linechart = new Chart('canvas', {  
        type: 'line',  
        data: { 
          labels: this.Contest,  
          datasets: [  
            {  
              data: this.Rating,  
              borderColor: '#3cb371',  
              backgroundColor: "#C9E0CA",  
            }  
          ] 
        },  
        options: {  
          legend: {  
            display: false  
          },  
          scales: {  
            xAxes: [{  
              // stacked: true,
              display: true  
            }],  
            yAxes: [{  
              // stacked: true,
              display: true,
            }],  
          }  
        }  
      });
    },
    (err) => {
      console.log(err);
    });
    // line chart

      
    //
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
      // this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      //   this._router.navigate(['/profile']);
      // }); 
      this._router.navigate(['/feedback']);
    },
    (err) => {
      this.successMessage = err.error.message;
      this.messageColor = 'bg-danger'
      this.isEditMode = false;
    });
    
  }

}
