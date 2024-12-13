import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserserviceService } from 'src/app/Services/userservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private userservice:UserserviceService)
  {

  }
  UserData:User={
    id:0,
    FirstName:'',
    LastName:'',
    UserName:'',
    Email:'',
    Password:'',
    Phone:0
  }
  RegisterUser()
  {
    this.userservice.RegisterUser(this.UserData).subscribe({
      next:(response) =>{
        alert('Registered User')
        console.log(this.UserData)
        console.log(response.result)
      },
      error:(err)=>{
        console.log(err)
        alert(err);
      }
    })
  }
}
