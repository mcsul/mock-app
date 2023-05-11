import { Injectable } from '@angular/core';
import {
  Platform,
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from '@ionic/angular';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ServerRequestProvider {
  public isDevApp: Boolean = true; // if true dev url and tracking on
  public baseUrl: any = '';
  public appVersion: any = '1.0';
  public globalRoute = {
    view: '',
    id: '',
  };

  constructor(
    public http: HttpClient,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController // public platform: Platform, // public alertCtrl: AlertController, // private modalCtrl: ModalController // public app: App
  ) {}

  getBaseUrl() {
    this.baseUrl = 'http://localhost:3000'; // live url

    if (this.isDevApp) {
      this.baseUrl = 'http://localhost:3000'; // dev url
    }

    return this.baseUrl;
  }

  setStart() {
    console.log('App started');
  }
  // simple GET request
  getTextFromServer(url: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'text/plain; charset=utf-8');
    return new Promise((resolve, reject) => {
      let remoteUrl = url;
      this.http
        .get(remoteUrl, { headers: headers, responseType: 'text' as 'text' })
        .toPromise()
        .then(
          (record: any) => {
            resolve(record);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
  // simple GET request
  getFromServer(url: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json');
    return new Promise((resolve, reject) => {
      let remoteUrl = url;
      this.http
        .get(remoteUrl, { headers: headers })
        .toPromise()
        .then(
          (record: any) => {
            resolve(record);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  // GET request with user token in Header
  getFromServerWithHeaders(url: any, token: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);

    // let userType = localStorage.getItem('user_type');

    return new Promise((resolve, reject) => {
      let remoteUrl = url;

      this.http
        .get(remoteUrl, { headers: headers })
        .toPromise()
        .then(
          (record: any) => {
            resolve(record.json());
          },
          (error) => {
            console.log('getFromServerWithHeaders failure ');
            console.log(error);
            reject(error.json());
          }
        );
    });
  }

  // simple POST request
  postOnServer(url: any, data: any): Promise<any> {
    // here we remove empty parameters before submitting the body with post call
    let bodyData = data; //data.replace(null, '').replace('null', '');
    // bodyData = bodyData.replace(/[^=&]+=(&|$)/g, '').replace(/&$/, '');

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return new Promise((resolve, reject) => {
      this.http
        .post(url, bodyData, { headers: headers })
        .toPromise()
        .then((data: any) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // POST request with user token in header
  postOnServerWithHeader(url: any, postData: any, token: any): Promise<any> {
    // console.log('Provider postOnServerWithHeader');
    // here we remove empty parameters before submitting the body with post call
    let bodyData = postData.replace(null, '').replace('null', '');
    bodyData = bodyData.replace(/[^=&]+=(&|$)/g, '').replace(/&$/, '');

    // console.log(bodyData);

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return new Promise((resolve, reject) => {
      this.http
        .post(url, bodyData, { headers: headers })
        .toPromise()
        .then((data: any) => {
          resolve(data.json());
        })
        .catch((error) => {
          console.log('postOnServerWithHeader failure ');
          console.log(error);
          reject(error.json());
        });
    });
  }

  // DELET request with user token in header
  deleteFromServerWithTokenHeader(url: any, token: any): Promise<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return new Promise((resolve, reject) => {
      this.http
        .delete(url, { headers: headers })
        .toPromise()
        .then((data: any) => {
          resolve(data.json());
        })
        .catch((error) => {
          reject(error.json());
        });
    });
  }

  // APNs post request on server
  apnsPostOnServer(url: any): Promise<any> {
    // console.log('Provider apnsPostOnServer');
    return new Promise((resolve, reject) => {
      this.http
        .get(url)
        .toPromise()
        .then((data) => {
          // console.log('success on apnsPostOnServer');
          resolve(JSON.stringify(data));
        })
        .catch((error) => {
          console.log('error on apnsPostOnServer');
          reject(JSON.stringify(error));
        });
    });
  }

  // function will call when user got 401 error on ajax call
  func_unauthorized_Alert() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user_type');
    localStorage.removeItem('login_type');
    localStorage.removeItem('userId');
  }

  // global Date formate function
  timeFormeter(seletedDate: any) {
    let now = seletedDate;
    let month = '' + (now.getMonth() + 1);
    if (month.length == 1) {
      month = '0' + month;
    }
    let day = '' + now.getDate();
    if (day.length == 1) {
      day = '0' + day;
    }
    let hour = '' + now.getHours();
    if (hour.length == 1) {
      hour = '0' + hour;
    }
    let minute = '' + now.getMinutes();
    if (minute.length == 1) {
      minute = '0' + minute;
    }
    let second = '' + now.getSeconds();
    if (second.length == 1) {
      second = '0' + second;
    }
    return hour + ':' + minute + ':' + second + ' - ' + day + '/' + month;
  }

  // global Date formate function
  dateFormet(seletedDate: any) {
    let now = new Date(seletedDate);
    let year = '' + now.getFullYear();
    let month = '' + (now.getMonth() + 1);
    if (month.length == 1) {
      month = '0' + month;
    }
    let day = '' + now.getDate();
    if (day.length == 1) {
      day = '0' + day;
    }
    // let hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
    // let minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
    // let second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
    return day + '/' + month + '/' + year;
  }

  dateFormetWithMonth(seletedDate: any) {
    let now = new Date(seletedDate);
    let year = '' + now.getFullYear();
    let month = '' + now.getMonth();
    let day = '' + now.getDate();
    if (day.length == 1) {
      day = '0' + day;
    }
    let m_names = new Array(
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    );

    return day + ' '; // + m_names[month] + ' ' + year;
  }

  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
  }
  // we are doing server error message handling because now error messages come from server end because of language translation
  serverErrorHandler(error: any) {
    if (typeof error === 'string' || error instanceof String) {
      return error;
    } else if (typeof error === 'object' && error.constructor === Object) {
      var errorMsg = '';
      for (var key in error) {
        if (error.hasOwnProperty(key)) {
          errorMsg += error[key] + '\n';
          // // console.log(key + " -> " + error[key]);
        }
      }
      return errorMsg;
    }
    return;
  }
}
