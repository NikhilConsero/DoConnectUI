import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserserviceService } from 'src/app/Services/userservice.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit //, //OnDestroy 
{
  loggedIn = false;  // Default to logged out
  // private loginStatusSubscription: Subscription=new Subscription;

  constructor(private userservice: UserserviceService, private router: Router) { }

  ngOnInit(): void {
    // Subscribe to the login status observable
      this.userservice.loggedIn$.subscribe(status => {
      this.loggedIn = status;  // Update the loggedIn variable when login status changes
    });
  }

  // ngOnDestroy(): void {
  //   // Unsubscribe from the observable to prevent memory leaks
  //   if (this.loginStatusSubscription) {
  //     this.loginStatusSubscription.unsubscribe();
  //   }
  // }
  logout() {
    console.log("Logging Out")
    this.userservice.SetLoggedIn(false,'dummytoken');  // Set loggedIn status to false
    this.router.navigate(['/login']);  // Navigate the user to login page
  }
}
