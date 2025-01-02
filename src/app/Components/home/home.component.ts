import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/Services/userservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // User information 
  isAdmin:boolean=false; // You can replace this with dynamic user info

  // Data related to the user's activity
  totalQuestionsPosted : number = 0;
  totalAnswersPosted: number = 0;
  totalQuestionsAwaitingApproval: number = 0;
  totalAnswersAwaitingApproval: number= 0;
  totalQuestionsRejected: number= 0;
  totalAnswersRejected:number=0;
  totalQuestionsApproved:number=0;
  totalAnswersApproved:number=0;
  totalQuestionsPendingApproval:number=0;
  totalAnswersPendingApproval:number=0;
  totalQuestionsNeedApproval:number=0;
  totalAnswersNeedApproval:number=0;
  userName:any=localStorage.getItem('username');
  Role:any=localStorage.getItem('role');

  constructor(private userservice:UserserviceService) {}

  ngOnInit(): void {
    if (this.Role=="Admin") {
      this.isAdmin=true;
    }
    console.log('HomeComponent loaded for user!');
    this.GetUserStats();
    
  }

  GetUserStats()
  {
    this.userservice.GetUserPostStatus(this.userName, this.Role).subscribe({
      next: (response) => {
        console.log(response);
        // Assign the values from the response JSON object to the component's properties
        this.totalQuestionsPosted = response.result.totalquestions;
        this.totalAnswersPosted = response.result.totalanswers;
        this.totalQuestionsAwaitingApproval = response.result.waitQuestion;
        this.totalAnswersAwaitingApproval = response.result.waitAnswer;
        this.totalQuestionsRejected = response.result.unappovedQuestion;
        this.totalAnswersRejected = response.result.unapprovedAnswers;
        this.totalQuestionsApproved = response.result.appovedQuestion;
        this.totalAnswersApproved = response.result.approvedAnswers;
        this.totalQuestionsNeedApproval = response.result.totalunapprovedquestion;
        this.totalAnswersNeedApproval = response.result.totalunapprovedanswer;
        // console.log(
        //   this.userName,this.totalQuestionsAwaitingApproval, 
        //   this.totalAnswersAwaitingApproval
        // );
      },
      error:(err)=>{
        console.log(err)
        alert(err);
      }
    });
  }

}
