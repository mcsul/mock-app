// // import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Platform, ToastController, LoadingController, AlertController, ModalController, App } from 'ionic-angular';
// // import { Push, PushObject, IOSPushOptions, AndroidPushOptions, RegistrationEventResponse, NotificationEventResponse } from '@ionic-native/push';
// import { Push, PushObject, PushOptions, NotificationEventResponse } from '@ionic-native/push';
// import { Device } from '@ionic-native/device';

// import { Http, Headers } from '@angular/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/toPromise';
// import { TranslateService } from '@ngx-translate/core';
// import { StatusBarProvider } from '../status-bar/status-bar';
// import { GoogleAnalyticsProvider } from '../google-analytics/google-analytics';
// import { Autostart } from '@ionic-native/autostart';
// // import { Observable } from 'rxjs/Observable';

// @Injectable()
// export class ServerRequestProvider {
//   public isDevApp: Boolean = true; // if true dev url and tracking on
//   public isCampaignPopOpen: Boolean = false; // if true dev url and tracking on
//   public baseUrl: any = '';
//   public langParam: any = 'en';
//   public userId: any = '';
//   //public appVersion: any = '0.6.0';
//   public appVersion: any = '2.0';
//   public updateAlert: any;
//   public notificationCount: number = 0;
//   public globalRoute = {
//     'view': '',
//     'id': ''
//   };

//   // public apnsRegistered: any;

//   constructor(public http: Http, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public translate: TranslateService, public platform: Platform, public push: Push, public device: Device, public alertCtrl: AlertController, public statusBarProvider: StatusBarProvider, private googleAnayltics: GoogleAnalyticsProvider, private modalCtrl: ModalController, public app: App, private autostart: Autostart) {
//     // console.log('Hello ServerRequestProvider Provider');

//     // platform.ready().then(() => {

//     //   this.userId = localStorage.getItem('userId');
//     //   this.apnsRegistered = localStorage.getItem('apns_registered');
//     //   if (!this.apnsRegistered) {
//     //     localStorage.setItem('apns_registered', '0');
//     //     this.apnsRegistered = 0;
//     //   }

//     //   if (platform.is('cordova')) {
//     //     this.pushNotificationFn();
//     //   }

//     // });

//     this.autostart.enable();
//   }

//   setStatusBar(color, overlay, hideOrShow) {
//     this.statusBarProvider.setStatusBar(color, overlay, hideOrShow);
//   }

//   pushNotificationFn() {

//     // if browser then don't need to make this native call
//     if (!this.platform.is('cordova')) return;

//     // to initialize push notifications


//     // console.log(' ------------------------------------------------ ');
//     // console.log(' Called pushNotificationFn() ');
//     // console.log(' ------------------------------------------------ ');

//     this.userId = localStorage.getItem('userId');
//     // this.apnsRegistered = localStorage.getItem('apns_registered');
//     // if (!this.apnsRegistered) {
//     //   localStorage.setItem('apns_registered', '0');
//     //   this.apnsRegistered = 0;
//     // }

//     const options: PushOptions = {
//       android: { senderID: '423300564007', clearBadge: true, forceShow: "1" },
//       ios: {
//         alert: 'true',
//         badge: true,
//         sound: 'true'
//       }
//     };

//     const pushObject: PushObject = this.push.init(options);

//     // to check if we have permission
//     this.push.hasPermission()
//       .then((res: any) => {
//         if (res.isEnabled) {
//           // console.log('We have permission to send push notifications');

//           pushObject.on('registration').subscribe((registration: any) => {
//             console.log('Device registered', registration);

//             // console.log('is apns Registered ' + this.apnsRegistered);
//             console.log('userId for APNs registrations ' + this.userId);

//             var apnsUrl = '';
//             var permissionParam = '';

//             if (this.platform.is('android')) {
//               permissionParam = '&android_notification=' + '1';
//               apnsUrl = 'http://gcm.supertasker.pk/register.php?userId=' + this.userId + '&registrationId=' + registration.registrationId + '&appname=Supertasker&appversion=' + this.appVersion + '&deviceuid=' + this.device.uuid + '&devicemodel=' + this.device.model + '&deviceversion=' + this.device.version + '&devicename=' + this.device.manufacturer + '&pushbadge=enabled&pushalert=enabled&pushsound=enabled&task=register';
//             }
//             else if (this.platform.is('ios')) {
//               permissionParam = '&ios_notification=' + '1';
//               apnsUrl = 'http://apn.supertasker.pk/apns.php?userId=' + this.userId + '&devicetoken=' + registration.registrationId + '&appname=Supertasker&appversion=' + this.appVersion + '&deviceuid=' + this.device.uuid + '&devicemodel=' + this.device.model + '&deviceversion=' + this.device.version + '&devicename=' + this.device.manufacturer + '&pushbadge=enabled&pushalert=enabled&pushsound=enabled&task=register';
//             }

//             if (this.userId) {

//               apnsUrl = apnsUrl.replace(/[^=&]+=(&|$)/g, "").replace(/&$/, "");

//               console.log('apns url ---->   ' + apnsUrl);
//               // console.log('permissionParam ---->   ' + permissionParam);

//               // our server call to update about notification permission

//               this.updateServerAboutNotification(permissionParam, registration.registrationId);

//               this.apnsPostOnServer(apnsUrl).then(record => {
//                 console.log('registered on server success');
//                 localStorage.setItem('apns_registered', '1');
//                 // this.apnsRegistered = 1;
//                 // console.log(record);
//               }).catch(error => {
//                 console.log('apns failure ');
//                 console.log(error);
//               });
//             }
//           });
//         } else {
//           if (this.userId) {
//             var permissionParam = '';
//             if (this.platform.is('android')) {
//               permissionParam = '&android_notification=' + '0';
//             }
//             else if (this.platform.is('ios')) {
//               permissionParam = '&ios_notification=' + '0';
//             }
//             // console.log('We do not have permission to send push notifications');
//             // console.log('permissionParam ---->   ' + permissionParam);
//             // our server call to update about notification permission
//             this.updateServerAboutNotification(permissionParam, '');
//           }
//         }
//       });

//     pushObject.on('registration').subscribe((registration: any) => {
//       console.log('Device Info: ');
//       console.log(registration);
//       var apnsUrl = 'http://apn.supertasker.pk/apns.php?userId=' + this.userId + '&devicetoken=' + registration.registrationId + '&appname=Supertasker&appversion=' + this.appVersion + '&deviceuid=' + this.device.uuid + '&devicemodel=' + this.device.model + '&deviceversion=' + this.device.version + '&devicename=' + this.device.manufacturer + '&pushbadge=enabled&pushalert=enabled&pushsound=enabled&task=register';
//       if (this.platform.is('ios')) {
//         console.log(apnsUrl);
//         this.updateServerAboutNotification('&ios_notification=1', registration.registrationId);
//         this.apnsPostOnServer(apnsUrl).then(record => {
//           console.log('registered on server success');
//           localStorage.setItem('apns_registered', '1');
//           // this.apnsRegistered = 1;
//           // console.log(record);
//         }).catch(error => {
//           console.log('apns failure ');
//           console.log(error);
//         });
//       }
//     });
//     pushObject.on('notification').subscribe((notification: NotificationEventResponse) => {
//       console.log('Received a notification');
//       console.log(notification);
//       console.log('========================');
//       console.log(this.globalRoute);
//       pushObject.clearAllNotifications();
//       this.notificationCount += 1;

//       if (notification.title==='<b>Leave Review</b>' && this.globalRoute.view == 'TaskDetailPage' && this.globalRoute.id == notification.additionalData.task_id) {
//         //localStorage.setItem('review', notification.additionalData.task_id);
//         return;
//       } else if (this.globalRoute.view == 'ChatOffererPage' && this.globalRoute.id == notification.additionalData.task_id) {
//         return;
//       }

//       if (notification.additionalData && typeof notification.additionalData.task_id == 'string' && notification.additionalData.task_id=='post') {
//         const alert = this.alertCtrl.create({
//           title: notification.title,
//           message: notification.message,
//           enableBackdropDismiss: false,
//           cssClass: 'customAlert',
//           buttons: [
//             {
//               text: '',
//               cssClass: 'okBtnCls',
//               handler: () => {
//                 // console.log('OK clicked');
//               }
//             },
//             {
//               text: 'POST A TASK',
//               cssClass: 'pushBtnShow',
//               handler: () => {
//                 //console.log('View clicked');
//                 console.log('additionalData ', notification.additionalData);
//                 if (notification.additionalData.task_id=='post') {
//                   let getActive = this.app.getActiveNavs();
//                   let nav = getActive[0];
//                   this.gaPageViewTracking('Post a Task from Notification');
//                   nav.push('HomePage', {});
//                 }
//               }
//             }
//           ]
//         });
//         alert.present();
//       } else {
//         const alert = this.alertCtrl.create({
//           title: notification.title,
//           message: notification.message,
//           enableBackdropDismiss: false,
//           cssClass: 'customAlert',
//           buttons: [
//             {
//               text: '',
//               cssClass: 'okBtnCls',
//               handler: () => {
//                 // console.log('OK clicked');
//               }
//             },
//             {
//               text: 'VIEW TASK',
//               cssClass: (notification.additionalData.task_id || notification.additionalData.message_id || notification.additionalData.store_url) ? 'pushBtnShow' : 'pushBtnHide',
//               handler: () => {
//                 //console.log('View clicked');
//                 console.log('additionalData ', notification.additionalData);
//                 if (typeof notification.additionalData.task_id == 'string' && notification.additionalData.task_id.indexOf('%23chat-') >= 0) {
//                   let userToken = localStorage.getItem('userToken');
//                   //console.log('go to chat detail');
//                   let getActive = this.app.getActiveNavs();
//                   let nav = getActive[0];

//                   let taskId = notification.additionalData.task_id;
//                   taskId = taskId.split('%23chat-');

//                   var url = this.getBaseUrl() + '/chat/is-valid?task_id=' + taskId[0] + '&offerer_id=' + taskId[1];
//                   this.getFromServerWithHeaders(url, userToken).then(record => {
//                     if (record['data'] == 1) {
//                       nav.push('ChatOffererPage', { 'taskId': taskId[0], 'data': record });
//                     }
//                   }).catch(error => {
//                     console.log(error.error);
//                   });
//                 }
//                 else if (notification.additionalData && notification.additionalData.message_id) {
//                   // console.log('go to messages');
//                   let getActive = this.app.getActiveNavs();
//                   let nav = getActive[0];
//                   nav.push('Chat', { 'taskId': notification.additionalData.message_id });
//                 }
//                 else if (notification.additionalData && notification.additionalData.task_id) {
//                   if (this.globalRoute.view == 'TaskDetailPage' && this.globalRoute.id == notification.additionalData.task_id) {
//                     console.log(notification.title);
//                     /* if(notification.title==='<b>Leave Review</b>') {

//                       let token = localStorage.getItem('userToken');
//                       this.getReviewInfo(token, notification.additionalData.task_id);
//                     } */
//                     return;
//                   }
//                   if(notification.title==='<b>Leave Review</b>') {
//                     localStorage.setItem('review', notification.additionalData.task_id);
//                   }
//                   // console.log('go to task detail');
//                   let getActive = this.app.getActiveNavs();
//                   let nav = getActive[0];

//                   nav.push('TaskDetailPage', { 'taskId': notification.additionalData.task_id });
//                 }
//                 else if (notification.additionalData && notification.additionalData.store_url) {
//                   window.open(notification.additionalData.store_url, '_system', 'location=yes');
//                 }
//               }
//             }
//           ]
//         });
//         alert.present();
//       }
//       // let toast = this.toastCtrl.create({
//       //   message: notification.title + '\n' + notification.message,
//       //   duration: 6000,
//       //   cssClass: 'pushNotification',
//       //   position: 'top'
//       // });
//       // toast.present();
//     });

//     pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

//   }

//   // let our server know that user allow or disallow push notifications
//   updateServerAboutNotification(permissionParam, deviceRegId) {

//     let bodyData = permissionParam;

//     if (this.platform.is('android')) {
//       bodyData = bodyData + '&uuid=' + deviceRegId;
//     }
//     else if (this.platform.is('ios')) {
//       bodyData = bodyData + '&uuid=' + this.device.uuid;
//     }

//     let token = localStorage.getItem('userToken');

//     if (!token) return;

//     // console.log('update Server About Notification ---->   ' + bodyData);

//     this.postOnServerWithHeader(this.getBaseUrl() + '/users/update', bodyData, token).then(record => {
//       // console.log('notification user update success');
//       // console.log(record);
//     }).catch(error => {
//       // console.log('notification user update failure ');
//       // console.log(error);
//     });
//   }

//   getBaseUrl() {

//     // console.log(this.viewCtrl);
//     //   console.log(this.viewCtrl.name);

//     // let getActive = this.app.getActiveNavContainers();
//     // let nav = getActive[0];



//     // // console.log(this.app.getActiveNavContainers());
//     // console.log(nav);
//     // console.log(nav['root']);
//     // console.log(nav['tabTitle']);

//     this.baseUrl = 'https://supertasker.pk/api'; // live url

//     if (this.isDevApp) {
//       this.baseUrl = 'http://dev.supertasker.pk/api'; // dev url
//     }

// /*     let update:any = localStorage.getItem('require_update');
//     update = JSON.parse(update);
//     //console.log("require_update :", update);
//     if (update && update.enable== false) {
//       const alert = this.alertCtrl.create({
//         title: update.msg.title,
//         cssClass: 'customAlert',
//         enableBackdropDismiss: false,
//         message: update.msg.body,
//         buttons: []
//       });
//       alert.present();
//     } else if (update && update.version > this.appVersion) {
//       if (!this.updateAlert) {
//         this.updateAlert = true;
//         const alert = this.alertCtrl.create({
//           title: 'Update Required',
//           cssClass: 'customAlert',
//           enableBackdropDismiss: false,
//           message: 'A new version of Supertasker is available. Update now and open the app again to continue.',
//           buttons: [
//             {
//               text: 'Update now',
//               cssClass: 'yesBtnCls',
//               handler: () => {
//                 window.open('market://details?id=com.supertaskers.pk', '_system', 'location=yes');
//               }
//             }
//           ]
//         });
//         alert.present();
//         alert.onDidDismiss(() => {
//           this.updateAlert = null
//         });
//       }
//     } */

//     return this.baseUrl;
//   }

//   //
//   setLang(lang) {
//     if (lang == 'en') {
//       this.platform.setDir('ltr', true)
//     }
//     else {
//       this.platform.setDir('rtl', true)
//     }
//     this.translate.use(lang);
//     this.langParam = lang;
//     localStorage.setItem('lang', lang);
//   }
//   setStart() {
//     console.log('App started');
//     localStorage.setItem('start', '1');
//   }
//   // simple GET request
//   getFromServer(url) {
//     let lang = localStorage.getItem('lang');
//     if (lang) {
//       this.langParam = lang;
//     }

//     //// Campaign popup trigger from here
//     //this.campaignPopup();

//     // // console.log('Lang Param is ' + this.langParam);
//     return new Promise((resolve, reject) => {
//       let remoteUrl = url
//       if (remoteUrl.match('page') || remoteUrl.match('mobile-verify') || remoteUrl.match('mobile-code') || remoteUrl.match('call-request')) {
//         remoteUrl = url;
//       }
//       else {
//         remoteUrl = url + '/' + this.langParam;
//       }
//       this.http.get(remoteUrl).toPromise().then(record => {
//         resolve(record.json());
//       }, (error => {
//         reject(error.json());
//       }))
//     });
//   }

//   // getFromServer(url){
//   //   return new Promise((resolve, reject) => {
//   //     this.http.get( url ).map(res => res.json()).subscribe(record => {
//   //       resolve(record);
//   //     }, (error => {
//   //       reject(error);
//   //     }))
//   //   });
//   // }

//   // GET request with user token in Header
//   getFromServerWithHeaders(url, token) {
//     let lang = localStorage.getItem('lang');
//     if (lang) {
//       this.langParam = lang;
//     }

//     // // console.log('Lang Param is ' + this.langParam);
//     let headers = new Headers();
//     headers.append('Content-Type', 'application/x-www-form-urlencoded');
//     headers.append('Accept', 'application/json');
//     headers.append('Authorization', 'Bearer ' + token);

//     let userType = localStorage.getItem('user_type');

//     if (!userType) {
//       this.setSkillCategory(token, headers);
//     }

//     //// Campaign popup trigger from here
//     //this.campaignPopup();

//     return new Promise((resolve, reject) => {
//       let remoteUrl = url
//       if (remoteUrl.match('refer') || remoteUrl.match('messages') || remoteUrl.match('my-tasks') || remoteUrl.match('notifications') || remoteUrl.match('is-valid') || remoteUrl.match('chat') || remoteUrl.match('page=') || remoteUrl.match('user-data') || remoteUrl.match('browse-tasks') || remoteUrl.match('pending-review') || remoteUrl.match('get-review-info') || remoteUrl.match('cash-back')) {
//         remoteUrl = url;
//       }
//       else {
//         remoteUrl = url + '/' + this.langParam;
//       }

//       this.http.get(remoteUrl, { headers: headers }).toPromise().then(record => {
//         resolve(record.json());
//       }, (error => {
//         console.log('getFromServerWithHeaders failure ');
//         console.log(error);
//         if (error.status == 401) {
//           this.func_unauthorized_Alert();
//         }
//         // else{
//         reject(error.json());
//         // }
//       }))
//     });
//   }

//   // simple POST request
//   postOnServer(url, data): Promise<any> {
//     // console.log('Provider postOnServer');
//     // here we remove empty parameters before submitting the body with post call
//     let bodyData = data.replace(null, '').replace('null', '');
//     bodyData = bodyData.replace(/[^=&]+=(&|$)/g, "").replace(/&$/, "");

//     // console.log(bodyData);

//     let headers = new Headers();
//     headers.append('Content-Type', 'application/x-www-form-urlencoded');
//     return new Promise((resolve, reject) => {
//       this.http.post(url, bodyData, { headers: headers }).toPromise().then(data => {
//         resolve(data.json());
//       }).catch(error => {
//         reject(error.json());
//       });
//     });
//   }

//   // POST request with user token in header
//   postOnServerWithHeader(url, postData, token): Promise<any> {
//     // console.log('Provider postOnServerWithHeader');
//     // here we remove empty parameters before submitting the body with post call
//     let bodyData = postData.replace(null, '').replace('null', '');
//     bodyData = bodyData.replace(/[^=&]+=(&|$)/g, "").replace(/&$/, "");

//     // console.log(bodyData);

//     let headers = new Headers();
//     headers.append('Content-Type', 'application/x-www-form-urlencoded');
//     headers.append('Accept', 'application/json');
//     headers.append('Authorization', 'Bearer ' + token);
//     return new Promise((resolve, reject) => {
//       this.http.post(url, bodyData, { headers: headers }).toPromise().then(data => {
//         resolve(data.json());
//       }).catch(error => {
//         console.log('postOnServerWithHeader failure ');
//         console.log(error);
//         reject(error.json());
//       });
//     });
//   }

//   // DELET request with user token in header
//   deleteFromServerWithTokenHeader(url, token): Promise<any> {
//     let headers = new Headers();
//     headers.append('Content-Type', 'application/x-www-form-urlencoded');
//     headers.append('Accept', 'application/json');
//     headers.append('Authorization', 'Bearer ' + token);
//     return new Promise((resolve, reject) => {
//       this.http.delete(url, { headers: headers }).toPromise().then(data => {
//         resolve(data.json());
//       }).catch(error => {
//         reject(error.json());
//       });
//     });
//   }


//   // APNs post request on server
//   apnsPostOnServer(url): Promise<any> {
//     // console.log('Provider apnsPostOnServer');
//     return new Promise((resolve, reject) => {
//       this.http.get(url).toPromise().then(data => {
//         // console.log('success on apnsPostOnServer');
//         resolve(JSON.stringify(data));
//       }).catch(error => {
//         console.log('error on apnsPostOnServer');
//         reject(JSON.stringify(error));
//       });
//     });
//   }

//   // POST request with user token in header
//   /*   phoneNumberVerification(tel): Promise<any> {
//       return new Promise((resolve, reject) => {
//         (<any>window).AccountKitPlugin.loginWithPhoneNumber({
//           useAccessToken: true,
//           defaultCountryCode: "PK",
//           facebookNotificationsEnabled: false,
//           initialPhoneNumber: ['', tel]
//         }, (successdata) => {
//           (<any>window).AccountKitPlugin.getAccount((data) => {
//             (<any>window).AccountKitPlugin.logout();
//             // console.log('Provider phone verification resolved');
//             resolve(data);
//           });
//         }, (error) => {
//           // console.log('Provider phone verification rejected');
//           reject(error);
//         });
//       });
//     } */

//   // function will call when user got 401 error on ajax call
//   func_unauthorized_Alert() {

//     localStorage.removeItem('userToken');
//     localStorage.removeItem('user_type');
//     localStorage.removeItem('login_type');
//     localStorage.removeItem('userId');

//     // let alert = this.alertCtrl.create({
//     //   title: 'Alert',
//     //   cssClass: 'errorAlert',
//     //   message: 'You need to login/signup before posting a task.',
//     //   buttons: [
//     //     {
//     //       text: 'Cancel',
//     //       role: 'cancel',
//     //       cssClass: 'noBtnCls',
//     //       handler: () => {
//     //         localStorage.removeItem('userToken');
//     //         localStorage.removeItem('user_type');
//     //         localStorage.removeItem('login_type');
//     //         localStorage.removeItem('userId');

//     //         console.log('Cancel clicked');
//     //       }
//     //     },
//     //     {
//     //       text: 'Login',
//     //       cssClass: 'yesBtnCls',
//     //       handler: () => {
//     //         this.app.getRootNav().setRoot('LoginPage');
//     //       }
//     //     }
//     //   ]
//     // });
//     // alert.present();
//   }

//   // POST request with user token and data will be in json format and with header
//   // postOnServerWithJsonObjHeader(url, postData, token): Promise<any> {
//   //   var headers = new Headers();
//   //   headers.append("Accept", 'application/json');
//   //   // headers.append('Content-Type', 'application/json');
//   //   // headers.append('Content-Type', 'application/x-www-form-urlencoded');
//   //   headers.append('Authorization', 'Bearer ' + token);
//   //   return new Promise((resolve, reject) => {
//   //     this.http.post(url, postData, { headers: headers }).toPromise().then(data => {
//   //       resolve(data.json());
//   //     }).catch(error => {
//   //       reject(error.json());
//   //     });
//   //   });
//   // }

//   // global Loading spinner function to show loader
//   presentLoadingDefault() {

//     var loadingText = '';

//     if (this.langParam == 'ur') {
//       loadingText = 'برائے مہربانی انتظار فرمائیں';
//     }
//     else {
//       loadingText = 'Please wait...';
//     }

//     let loadingSpinner = this.loadingCtrl.create({
//       spinner: 'crescent',
//       content: loadingText
//     });

//     return loadingSpinner;
//   }

//   // global Toast function to show toast messages
//   presentToast(msg) {
//     let toast = this.toastCtrl.create({
//       message: msg,
//       position: 'bottom',
//       duration: 4000,
//       cssClass: 'wrapToastText',
//     });
//     toast.present();
//   }

//   // global Date formate function
//   timeFormeter(seletedDate) {
//     let now = seletedDate;
//     let month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
//     let day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
//     let hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
//     let minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
//     let second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
//     return hour + ":" + minute + ":" + second + " - " + day + "/" + month;
//   }

//   // global Date formate function
//   dateFormet(seletedDate) {
//     let now = new Date(seletedDate);
//     let year = "" + now.getFullYear();
//     let month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
//     let day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
//     // let hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
//     // let minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
//     // let second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
//     return day + "/" + month + "/" + year;
//   }

//   dateFormetWithMonth(seletedDate) {
//     let now = new Date(seletedDate);
//     let year = "" + now.getFullYear();
//     let month = "" + (now.getMonth());
//     let day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
//     let m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

//     return day + " " + m_names[month] + " " + year;
//   }

//   // GA page view tracking
//   gaPageViewTracking(modelData) {
//     // let trackingId = 'UA-126645213-1'; // live url
//     // if (this.isDevApp) {
//     //   trackingId = 'UA-130102191-1'; // dev url
//     // }

//     // this.googleAnayltics.pageViewTracking(modelData, trackingId);
//     this.googleAnayltics.pageViewTracking(modelData);
//   }

//   // GA event tracking
//   gaEventTracking(category, action, label) {
//     // let trackingId = 'UA-126645213-1'; // live url
//     // if (this.isDevApp) {
//     //   trackingId = 'UA-130102191-1'; // dev url
//     // }

//     // this.googleAnayltics.eventTracking(modelData, trackingId);
//     this.googleAnayltics.eventTracking(category, action, label);
//   }

//   numberWithCommas(x) {
//     return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
//   }
//   // we are doing server error message handling because now error messages come from server end because of language translation
//   serverErrorHandler(error) {
//     if (typeof error === 'string' || error instanceof String) {
//       return error;
//     }
//     else if (typeof error === 'object' && error.constructor === Object) {
//       var errorMsg = '';
//       for (var key in error) {
//         if (error.hasOwnProperty(key)) {
//           errorMsg += error[key] + '\n';
//           // // console.log(key + " -> " + error[key]);
//         }
//       }
//       return errorMsg;
//     }
//   }

//   pendingReview(token) {
//     if(!token) return;
//     console.log('server-requ->pendingReview');
//     this.getFromServerWithHeaders(this.getBaseUrl() + '/pending-review', token).then(record => {
//         if(record) {
//           let task = record['data'][0];
//           console.log(task);
//           if(task!==undefined && task.task_id) {
//             const modal = this.modalCtrl.create('PendingReviewPage', { task }, {cssClass: 'mdl2'});
//             modal.present();
//           }
//         }
//     }).catch(error => {
//       console.log(error.error);
//     });
//   }

//   getReviewInfo(token, task_id) {
//     console.log('server-requ->getReviewInfo');
//     this.getFromServerWithHeaders(this.getBaseUrl() + '/get-review-info/'+ task_id, token).then(record => {
//       if(record) {
//         let task = record['data'][0];
//         console.log(task);
//         if(task!==undefined && task.task_id) {
//           const modal = this.modalCtrl.create('PendingReviewPage', { task }, {cssClass: 'mdl2'});
//           modal.present();
//         }
//       }
//     }).catch(error => {
//       console.log(error.error);
//     });
//   }
//   /*
//     this function will launch the campaign popup
//   */
//   campaignPopup() {
//     var getStoredTime = localStorage.getItem('campaign_start'),
//       startTime: any = (getStoredTime) ? new Date(getStoredTime).getTime() : null;
//     if (startTime) {
//       let endTime = new Date().getTime();
//       let differenceHours = Math.floor(Math.abs(startTime - endTime) / 10800000);

//       if (differenceHours == 1 && !this.isCampaignPopOpen) {
//         this.isCampaignPopOpen = false;
//       }
//       else if (differenceHours == 0) {
//         return;
//       }
//     }

//     if (this.isCampaignPopOpen) return;

//     this.isCampaignPopOpen = true;

//     // campaign ajax to check
//     this.http.get(this.getBaseUrl() + '/campaign-popup/mobile').map(record => record.json()).subscribe(data => {
//       let responseJson = data['data'];

//       console.log(' on success campaign');
//       console.log(responseJson);

//       if (responseJson) {
//         let userId = localStorage.getItem('userId');
//         var html: any;
//         if (userId) {

//           html = responseJson.replace('user_id', userId);
//           // html = responseJson.replace('<a ', '<a (click)=“closePopup()” ');
//         }
//         else {
//           html = responseJson;
//           // html = responseJson.replace('<a ', '<a (click)="closePopup()" ');
//         }

//         let modal = this.modalCtrl.create('CampaignModalPage', { html }, { cssClass: 'CampaignPopup' });
//         // modal.onDidDismiss(data => {
//         // });
//         modal.present();
//         this.isCampaignPopOpen = false;
//         localStorage.removeItem('campaign_start');
//         let setStartDate = (new Date(new Date().getTime())).toString();
//         localStorage.setItem('campaign_start', setStartDate);
//       }
//     }, (error => {
//       console.log('campaign popup failure');
//       localStorage.removeItem('campaign_start');
//       this.isCampaignPopOpen = false;
//       console.log(error);
//     }));
//   }

//   /*
//     this function will launch the set skill popup for user
//   */
//   setSkillCategory(userToken, headers) {
//     if (userToken) {

//       this.http.get(this.getBaseUrl() + '/users/category/count', { headers: headers }).map(record => record.json()).subscribe(data => {
//         // console.log('setSkillCategory success');
//         // console.log(data);

//         let responseJson = data['data'];

//         localStorage.setItem('user_type', responseJson.user_type);

//         if (responseJson.count == 0) {
//           let modal = this.modalCtrl.create('CategorySelectionPage', { 'showClose': false });
//           modal.onDidDismiss(data => {
//             // console.log('page > modal dismissed > data > ', data);
//             if (data.length > 0) {

//               let bodyData = '';

//               data.forEach(function (categoryList) {
//                 bodyData = bodyData + 'category_id[]=' + categoryList.id + '&';
//               });

//               bodyData = bodyData.substring(0, bodyData.length - 1); // "remove last &"

//               // console.log(bodyData);

//               this.postOnServerWithHeader(this.getBaseUrl() + '/users/update', bodyData, userToken).then(data => {
//                 // console.log('category set successfully');
//                 // console.log(data);
//                 window.location.reload();
//               }).catch(error => {
//                 // console.log(error.error);
//                 this.presentToast(this.serverErrorHandler(error.error));
//               });
//             }
//           });
//           modal.present();
//         }


//       }, (error => {
//         // console.log(error);
//       }));
//     }
//   }
// }
