import { environment } from '../';
import { Injectable } from "@angular/core";

declare var firebase: any;

@Injectable()
export class DatabaseService {

  private configData: any;

  constructor () {}

  initConfigData() {
    if(environment.production) {

      // production
      this.configData = {
        apiKey: "AIzaSyBhr4WBsOhPa8OVhrttPu9GUsodFTB1ea4",
        authDomain: "ng2-lina.firebaseapp.com",
        databaseURL: "https://ng2-lina.firebaseio.com",
        storageBucket: "ng2-lina.appspot.com",
      };
    }

    // test
    else {
      this.configData = {
        apiKey: "AIzaSyARgiVENsAWV8ev2kn--bRyKSo_O4npGlc",
        authDomain: "ng2-lina-test.firebaseapp.com",
        databaseURL: "https://ng2-lina-test.firebaseio.com",
        storageBucket: "ng2-lina-test.appspot.com",
      };
    }
  }

  initializeApp() {
    firebase.initializeApp(this.configData);
  }

}