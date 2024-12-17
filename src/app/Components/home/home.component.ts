import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // User information
  isAdmin:boolean=false;
  userName: string = 'John Doe'; // You can replace this with dynamic user info

  // Data related to the user's activity
  numberOfQuestionsPosted: number = 5;
  numberOfAnswersPosted: number = 12;
  numberOfQuestionsPendingApproval: number = 3;
  numberOfAnswersPendingApproval: number = 7;

  constructor() {}

  ngOnInit(): void {
    console.log('HomeComponent loaded for user!');
  }
}
