import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import  'rxjs/Rx';
import {Observable} from "rxjs/Observable";
declare var firebase: any;

@Injectable()
export class DataService {
  private database;

  constructor (private _http: Http) {
    this.database = firebase.database();
  }

  postQuestionData(data: any): Observable<any> {

    return new Observable(observer => {
      var newQuestionKey = this.database.ref().child('questions').push().key;
      this.database.ref(`questions/${newQuestionKey}`).set(data)
        .then(() => {
          console.log(`Question with key ${newQuestionKey} was saved to database.`);
          observer.next(newQuestionKey);
          observer.complete();
        })
        .catch(() => {
          observer.error(new Error("Error occurred when saving the question!"));
        });
    });
  }

  postCorrectAnswer(questionId: string, correctAnswer: number): Observable<any> {
    return new Observable(observer => {
      this.database.ref().child(`answers/${questionId}`).set(correctAnswer)
        .then(() => {
          console.log(`Saved correct answer ${correctAnswer} for question with key ${questionId}.`);
          observer.complete();
        })
        .catch(() => {
          observer.error(new Error("Error occurred when saving correct question!"));
        });
    });
  }

  checkAnswer(questionKey: string, correctAnswer: number): Observable<any> {
    return new Observable(observer => {
      this.database.ref(`answers/${questionKey}`).once('value')
      .then((snapshot) => {
        if( snapshot.val() ) {
          observer.next(snapshot.val() == correctAnswer);
        }
        else {
          observer.error(new Error("Error occurred when checking correct answer!"));
        }
        observer.complete();
      })
      .catch(() => {
        observer.error(new Error("Error occurred when checking correct answer!"));
      });;
    });
  }
}
