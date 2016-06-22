import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Injectable()
export class DataService {
  constructor (private _http: Http) {}

  getTokenFromLocalStorage(): String {
    return localStorage.getItem('token') !== null ? '?auth=' + localStorage.getItem('token') : '';
  }

  createJsonHeaders(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  getAllData(): Observable<any> {
    const token = this.getTokenFromLocalStorage();
    return this._http.get('https://ng2-lina.firebaseio.com/questions.json' + token)
      .map(response => response.json());
  }

  postQuestionData(data: any): Observable<any> {
    const token = this.getTokenFromLocalStorage();
    const body = JSON.stringify(data);

    return this._http.post(
      'https://ng2-lina.firebaseio.com/questions.json' + token,
      body,
      {headers: this.createJsonHeaders()}
    )
    .map(response => response.json());
  }

  postCorrectAnswer(name: string, correctAnswer: number): Observable<any> {
    const token = this.getTokenFromLocalStorage();
    const body = `{"${name}": ${correctAnswer}}`;

    return this._http.post(
      'https://ng2-lina.firebaseio.com/answers.json' + token,
      body,
      {headers: this.createJsonHeaders()}
    )
      .map(response => response.json());
  }
}
