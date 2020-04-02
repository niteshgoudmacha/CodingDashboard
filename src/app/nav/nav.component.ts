import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private _router: Router,
    private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  isAuth() {
    return this.authService.isAuth();
  }

  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/']);
  }


}
