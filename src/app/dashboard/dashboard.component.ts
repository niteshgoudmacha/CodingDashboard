import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DataserviceService } from '../dataservice.service';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

export interface UserData {
  Platform: string;
  Name: string;
  Start: string;
  End: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['Platform', 'Name', 'Start', 'End'];
  displayedColumns1: string[] = ['Platform', 'Name', 'Start', 'Rank', 'Rating'];
  dataSource: MatTableDataSource<UserData>;
  pastContests: MatTableDataSource<UserData>;
  users;
  contests;
  isLoading: boolean = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private data: DataserviceService,
    private authService: AuthService,
    private _router: Router) {
    // Create 100 users
    // data.getdata().subscribe((res) => {
    //   console.log(res);
    //   this.users = res;
    //   this.isLoading = false;
    //   // Assign the data to the data source for the table to render
    //   const ds = [];
    //   let c = 1;
    //   let prevR = -1;
    //   this.users.forEach(element => {
    //     ds.push({
    //       Rank: c,
    //       HackerrankHandle: element.HackerrankHandle,
    //       Rating: element.Rating,
    //       TimesPlayed: element.TimesPlayed
    //     });
    //     if (prevR !== element.Rating) {
    //       c++;
    //       prevR = element.Rating;
    //     }
    //   });
    //   this.dataSource = new MatTableDataSource(ds);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });
  }

  ngOnInit() {
    if(!this.authService.isAuth()) {
      this._router.navigate(['/']);
    }
    this.isLoading = true;
    this.data.getContests().subscribe(contests => {
      this.isLoading = false;
      this.contests = contests;
      console.log(contests);
      console.log(new Date(contests[0].startTime).toLocaleTimeString());
      const ds = [];
      const pc = []
      let c = 1;
      let prevR = -1;
      this.contests.forEach(element => {
        console.log(new Date(element.endTime) >= new Date());
        if(new Date(element.endTime) > new Date()) {
          ds.push({
            Platform: element.platform,
            Name: element.name,
            url: element.url,
            startTime: new Date(element.startTime).toLocaleDateString() + "\n" + new Date(element.startTime).toLocaleTimeString(),
            endTime: new Date(element.endTime).toLocaleDateString() + "\n" + new Date(element.endTime).toLocaleTimeString()
          });
        } 
        else {
          pc.push({
            Platform: element.platform,
            Name: element.name,
            url: element.url,
            startTime: new Date(element.startTime).toLocaleDateString() + "\n" + new Date(element.startTime).toLocaleTimeString(),
            endTime: new Date(element.endTime).toLocaleDateString() + "\n" + new Date(element.endTime).toLocaleTimeString()
          });
        }
        
        // if (prevR !== element.Rating) {
        //   c++;
        //   prevR = element.Rating;
        // }
      });
      this.dataSource = new MatTableDataSource(ds);
      this.pastContests = new MatTableDataSource(pc);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 
    (err) => {
      console.log(err);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
