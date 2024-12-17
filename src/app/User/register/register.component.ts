import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserserviceService } from 'src/app/Services/userservice.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {  
  form: FormGroup;
  isRegistered:boolean=false;
  constructor(private userservice:UserserviceService,private fb:FormBuilder)
  {
    this.form=this.fb.group({
      FirstName: ['', [Validators.required, Validators.minLength(2)]],
      LastName: ['', [Validators.required, Validators.minLength(2)]],
      UserName: ['', [Validators.required, Validators.minLength(3)]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      Phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }
  get formControls() {
    return this.form.controls;
  }
  UserData:User={
    id:0,
    FirstName:'',
    LastName:'',
    UserName:'',
    Email:'',
    Password:'',
    Phone:0,
    Role:'User'
  }
  RegisterUser()
  {
    if (this.form.invalid) {
      return; // Stop if the form is invalid
    }
    this.isRegistered=true;
    setTimeout(()=>{
      this.isRegistered=false;
    },5000)
      this.UserData.id= 0,
      this.UserData.FirstName= this.form.value.FirstName;
      this.UserData.LastName= this.form.value.LastName;
      this.UserData.UserName= this.form.value.UserName;
      this.UserData.Email= this.form.value.Email;
      this.UserData.Password= this.form.value.Password;
      this.UserData.Phone= this.form.value.Phone;
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
