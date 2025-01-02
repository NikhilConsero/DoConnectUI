import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../models/question';
import { Observable } from 'rxjs';

const baseurl = "http://localhost:5027/api";
@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  constructor(private http:HttpClient) { }
  PostQuestion(q:Question):Observable<any>{
    return this.http.post(baseurl+'/Question/AskQuestion',q);
  }

  GetAllQuestion():Observable<Question[]>{
    return this.http.get<Question[]>(baseurl+'/Question/GetAllQuestion')
  }
}
