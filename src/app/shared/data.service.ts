import { Injectable } from "@angular/core";
import  'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { User } from "./user.model";
import { Question } from "./question.model";
import { Http } from '@angular/http';

declare var _: any;
declare var firebase: any;

@Injectable()
export class DataService {
  private database;
  private questionProgress: number;

  constructor (
    private _http: Http
  ) {
    this.database = firebase.database();
    this.questionProgress = 0;
  }

  allQuestionsData$(): Observable<any> {
    return new Observable(observer => {
      this.database.ref(`questions`).on('value', (snapshot) => {
        observer.next(snapshot.val());
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
        .catch((error) => {
          console.error(error);
        });
    });
  }

  postQuestionData(data: any): Observable<any> {
    return new Observable(observer => {
      var newQuestionKey = this.database.ref().child('questions').push().key;
      this.database.ref(`questions/${newQuestionKey}`).set(data)
        .then(() => {
          // console.log(`Question with key ${newQuestionKey} was saved to database.`);
          observer.next(newQuestionKey);
        })
        .catch((error) => {
          observer.error(error);
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

    // console.log(`DataService.checkAnswer(${questionKey}, ${correctAnswer})`);

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
      .catch((error) => {
        observer.error(error);
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

  // allCodes$(): Observable<any> {
  //   return new Observable(observer => {
  //     this.database.ref('codes').on('value', function(snapshot) {
  //       observer.next(snapshot.val());
  //     });
  //   });
  // }

  allUsers$(): Observable<{}> {
    return new Observable(observer => {
      this.database.ref('users').on('value', function(snapshot) {
        observer.next(snapshot.val());
      });
    });
  }

  user$(uid: string): Observable<{}> {
    return new Observable(observer => {
      this.database.ref(`users/${uid}`).on('value', function(snapshot) {
        observer.next(snapshot.val());
      });
    });
  }

  users$(): Observable<{}> {
    return new Observable(observer => {
      this.database.ref('users').on('value', function(snapshot) {
        _.each(snapshot.val(), (userData: User) => {
          observer.next(<User>userData);
        });
        observer.complete();
      });
    });
  }

  postQuestionFail(questionData: Question) {
    return new Observable(observer => {
      this.database.ref(`questions/${questionData.id}`).once('value')
      .then((snapshot) => {
        if( !snapshot ) {
          observer.complete();
        }

        let newQuestionData = snapshot.val();
        let timesFailed = newQuestionData.timesFailed || 0;

        newQuestionData.timesFailed = timesFailed + 1;

        this.database.ref(`questions/${questionData.id}`).update(newQuestionData);
        observer.complete();
      })
      .catch((error) => {
        observer.error(new Error(error));
      });
    });
  }

  randomNumber$(numberOfContestants: number): Observable<any> {

    const data = {
      "jsonrpc": "2.0",
      "method": "generateIntegers",
      "params": {
          "apiKey": "04f7266a-6579-430a-95c7-4010fa823a02",
          "n": 1,
          "min": 0,
          "max": numberOfContestants,
          "replacement": true
      },
      "id": 1
    };

    return this._http.post('https://api.random.org/json-rpc/1/invoke', JSON.stringify(data));
  }

  resetWeek(): any {
    this.allUsers$()
    .take(1)
    .map((allUsers) => {
      return _.each(allUsers, (userData: User) => {
        allUsers[userData.uid].highScore = 0;
      });
    })
    .subscribe({
      next: (allUsers) => {
        this.database.ref('users/').update(allUsers);
      }
    });
  }

  allQuestions$(): Observable<any> {
    return new Observable(observer => {
      this.database.ref(`questions`).on('value', (snapshot) => {
        observer.next(snapshot.val());
      });
    });
  }
}
