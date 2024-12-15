import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

const baseurl = "http://localhost:5027/api";

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  // BehaviorSubject to manage login state reactively
  private loggedInStatus = new BehaviorSubject<boolean>(this.isLoggedIn());
  loggedIn$ = this.loggedInStatus.asObservable(); // Expose the login state as observable

  constructor(private http: HttpClient) { }

  // Check if the token is present in localStorage
  private isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Returns true if token is found
  }

  // API call for user registration
  RegisterUser(user: any): Observable<any> {
    return this.http.post(baseurl + '/User/Register', user);
  }

  // API call for user login
  UserLogin(user: any, email: any, password: any): Observable<any> {
    console.log(user);
    return this.http.post(baseurl + '/User/Login?email=' + email + '&password=' + password, user);
  }

  // Set login status (true/false)
  SetLoggedIn(status: boolean) {
    if (status) {
      localStorage.setItem('token', 'dummy-token'); // Store a dummy token (replace this with actual logic)
    } else {
      localStorage.removeItem('token'); // Remove token on logout
    }
    this.loggedInStatus.next(status); // Update the loggedInStatus observable
  }

  // Get the current login status
  getLoginStatus() {
    return this.loggedInStatus.value; // Return current login status (true/false)
  }
}
