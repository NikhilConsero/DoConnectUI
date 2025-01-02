import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './User/login/login.component';
import { RegisterComponent } from './User/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { QuestionComponent } from './Components/question/question.component';
import { AnswerComponent } from './Components/answer/answer.component';
import { MyPostComponent } from './Components/my-post/my-post.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'home',component:HomeComponent,canActivate: [AuthGuard]},
  {path:'question',component:QuestionComponent,canActivate: [AuthGuard]},
  {path:'answers',component:AnswerComponent,canActivate: [AuthGuard]},
  {path:'myposts',component:MyPostComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
