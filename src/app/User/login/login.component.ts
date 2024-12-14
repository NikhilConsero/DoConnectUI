import { Component } from '@angular/core';
import { UserserviceService } from 'src/app/Services/userservice.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form:FormGroup;
  UserData:User={
    Email:'',
    Password:'',
  }
  constructor(private userservice:UserserviceService,private fb:FormBuilder)
  {
      this.form=this.fb.group({
      // Corrected validation syntax
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
    });

  }
  get formControls() {
    return this.form.controls;
  }
  LoginUser(){
    if(this.form.invalid)
    {
      return;
    }
    this.UserData.Email=this.form.value.Email;
    this.UserData.Password=this.form.value.Password;
    this.userservice.UserLogin(this.UserData,this.UserData.Email,this.UserData.Password).subscribe({
      next:(response)=>{
        console.log(this.UserData)
        console.log(response.result);
      },
      error:(err)=>{
        console.log(err)
        alert(err);
      }
      })
  }
}
