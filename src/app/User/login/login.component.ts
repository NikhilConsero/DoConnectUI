import { Component } from '@angular/core';
import { UserserviceService } from 'src/app/Services/userservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userservice:UserserviceService){}
  
}
