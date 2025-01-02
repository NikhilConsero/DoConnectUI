import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from 'src/app/models/question';
import { QuestionServiceService } from 'src/app/Services/question-service.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  constructor(private questionservice: QuestionServiceService) {}

  ngOnInit(): void {
    this.GetAll();  // Get initial list of questions on component load
  }

  QuestionData?: Question = {
    Qid: 0,
    topicname: '',
    question: '',
    username: '',
    UserId: 1,
    approved: 'W' 
  };

  @Input() questions: any;  // Input property for question list
  @Output() questionDataEmitter: EventEmitter<Question> = new EventEmitter<Question>();
  @Output() questionlistdataChange = new EventEmitter();  // Emit updated question list to parent

  newQuestion: any;  // Holds the user's question input
  selectedTopic: any;  // Holds the selected topic
  topics: string[] = ['Technology', 'Health', 'Education', 'Science', 'Business', 'Finance', 'Sports', 'Movies', 'Politics', 'Other'];

  postQuestion() {
    // Create the new question object
    this.QuestionData = {
      Qid: 0,
      topicname: this.selectedTopic,
      question: this.newQuestion,
      username: localStorage.getItem('username') ?? '',
      UserId: Number(localStorage.getItem('UserID')),
      approved: 'W'
    };

    // Post the question via the service
    this.questionservice.PostQuestion(this.QuestionData).subscribe({
      next: (r) => {
        console.log('Question posted:', this.QuestionData);

        // Add the new question to the questions list without making another API call
        this.questions.push(this.QuestionData);
        this.questionlistdataChange.emit(this.questions);  // Emit the updated list to parent component

        // Reset the form fields after posting
        this.newQuestion = '';  // Clear the input for the question
        this.selectedTopic = '';  // Clear the selected topic
      },
      error: (err) => {
        console.log('Error posting question:', err);
      }
    });
  }

  GetAll() {
    this.questionservice.GetAllQuestion().subscribe({
      next: (r: any) => {
        this.questions = r;  // Populate the question list
        this.questionlistdataChange.emit(this.questions);  // Emit to parent if needed
      },
      error: (err) => {
        if (err.result == null) {
          this.questions = [];
          this.questionlistdataChange.emit(this.questions);  // Emit empty list if no data
        }
      }
    });
  }
}
