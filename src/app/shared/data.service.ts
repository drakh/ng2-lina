import { Injectable } from "@angular/core";
import  'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { User } from "./user.model";
import { Question } from "./question.model";

declare var _: any;
declare var firebase: any;

@Injectable()
export class DataService {
  private database;
  private questionProgress: number;

  constructor () {
    this.database = firebase.database();
    this.questionProgress = 0;
  }

  getAllQuestionsData(): Observable<any> {
    return new Observable(observer => {
      this.database.ref(`questions`).on('value', (snapshot) => {

        _.each(snapshot.val(), (question, key) => {
          observer.next([key, question]);
        });

        observer.complete();
      });
    });
  }

  getAllAnswersData(): Observable<any> {
    return new Observable(observer => {
      this.database.ref(`answers`).once('value')
        .then((snapshot) => {
          observer.next(snapshot.val());
        })
    });
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
      });
    });
  }

  saveNewUser(userData: User) {
    this.database.ref(`users/${userData.uid}`).once('value').then((snapshot) => {
      if( !snapshot.val() ) {
        this.database.ref(`users/${userData.uid}`).set(userData);
      }
    });
  }

  checkIfUserExist(uid: string) {
    return this.database.ref(`users/${uid}`).once('value');
  }

  allCodes$(): Observable<any> {
    return new Observable(observer => {
      this.database.ref('codes').on('value', function(snapshot) {
        observer.next(snapshot.val());
      });
    });
  }

  allUsers$(): Observable<any> {
    return new Observable(observer => {
      this.database.ref('users').on('value', function(snapshot) {
        observer.next(snapshot.val());
      });
    });
  }

  // postQuestionFail(questionData: Question) {
  //   return new Observable(observer => {
  //     this.database.ref(`questions/${questionData.id}`).once('value')
  //     .then((snapshot) => {
  //       if( !snapshot ) {
  //         observer.complete();
  //       }

  //       let newQuestionData = snapshot.val();
  //       let timesFailed = newQuestionData.timesFailed || 0;

  //       newQuestionData.timesFailed = timesFailed + 1;

  //       this.database.ref(`questions/${questionData.id}`).update(newQuestionData);
  //       observer.complete();
  //     })
  //     .catch((error) => {
  //       observer.error(new Error(error));
  //     });
  //   });
  // }
}
