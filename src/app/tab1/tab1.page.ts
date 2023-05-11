import { Component, ViewChild, ElementRef } from '@angular/core';
import { ServerRequestProvider } from '../server-request/server-request';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  @ViewChild('chat_input') messageInput: ElementRef;
  public chatType: string = 'avatar';
  public editorMsg: any = '';

  public uId: any = '-1';
  public sceneId: any =
    'workspaces/default-idlh10_ibjsptvmnan4-ja/characters/clone-4fo6djgjsucwunirain45a';
  public characterId: any =
    'workspaces/default-idlh10_ibjsptvmnan4-ja/characters/clone-4fo6djgjsucwunirain45a';
  public playerName: any = 'Faisal';
  public serverId: any = '5678';
  public msgList: any = [];
  public sessionId: any = ''; // user session
  public character = {
    id: '',
    resourceName: '',
    displayName: '',
  };
  public records = [
    {
      type: 'emotion',
      sessionId:
        'default-idlh10_ibjsptvmnan4-ja:75690504-fd69-4c57-b545-44514b2d3cc2',
      uid: '-1',
      serverId: '1234',
      joy: 0,
      fear: 0,
      trust: 0,
      surprise: 0,
      behavior: 'Neutral',
      strength: 'Strong',
    },
    {
      type: 'text',
      sessionId:
        'default-idlh10_ibjsptvmnan4-ja:75690504-fd69-4c57-b545-44514b2d3cc2',
      uid: '-1',
      serverId: '1234',
      final: true,
      text: 'Hello and welcome, Kaya.',
    },
    {
      type: 'text',
      sessionId:
        'default-idlh10_ibjsptvmnan4-ja:75690504-fd69-4c57-b545-44514b2d3cc2',
      uid: '-1',
      serverId: '1234',
      final: true,
      text: ' Thank you for taking the time to interview for the .',
    },
    {
      type: 'emotion',
      sessionId:
        'default-idlh10_ibjsptvmnan4-ja:75690504-fd69-4c57-b545-44514b2d3cc2',
      uid: '-1',
      serverId: '1234',
      joy: 0,
      fear: 0,
      trust: 0,
      surprise: 0,
      behavior: 'Neutral',
      strength: 'Strong',
    },
    {
      type: 'text',
      sessionId:
        'default-idlh10_ibjsptvmnan4-ja:75690504-fd69-4c57-b545-44514b2d3cc2',
      uid: '-1',
      serverId: '1234',
      final: true,
      text: ' Could you please tell me a little bit about your experience in this field?',
    },
    {
      type: 'emotion',
      sessionId:
        'default-idlh10_ibjsptvmnan4-ja:75690504-fd69-4c57-b545-44514b2d3cc2',
      uid: '-1',
      serverId: '1234',
      joy: 0,
      fear: 0,
      trust: 0,
      surprise: 0,
      behavior: 'Neutral',
      strength: 'Strong',
    },
    {
      type: 'text',
      sessionId:
        'default-idlh10_ibjsptvmnan4-ja:75690504-fd69-4c57-b545-44514b2d3cc2',
      uid: '-1',
      serverId: '1234',
      final: true,
      text: ' Specifically, how many years of experience do you have?',
    },
    {
      type: 'emotion',
      sessionId:
        'default-idlh10_ibjsptvmnan4-ja:75690504-fd69-4c57-b545-44514b2d3cc2',
      uid: '-1',
      serverId: '1234',
      joy: 0,
      fear: 0,
      trust: 0,
      surprise: 0,
      behavior: 'Neutral',
      strength: 'Strong',
    },
  ];

  constructor(private serverRequest: ServerRequestProvider) {
    this.sessionId = localStorage.getItem('sessionId');
    this.character = JSON.parse(localStorage.getItem('character') || '{}');
    this.msgList = JSON.parse(localStorage.getItem('msgList') || '[]');

    // // localStorage.setItem('msgList', JSON.stringify(this.msgList));
    // this.msgList = [
    //   { user: 'Faisal', message: 'Hi this Faisal,' },
    //   { user: 'Inworld User', message: 'Are you ready?' },
    //   {
    //     user: 'Faisal',
    //     message: 'I have 10 year experiance in software development.',
    //   },
    // ];

    // this.msgList.push({
    //   user: 'Inworld User',
    //   message: 'This is new message here.',
    // });

    // console.log(this.msgList);

    // localStorage.setItem('msgList', JSON.stringify(this.msgList));
    // let chat = JSON.parse(localStorage.getItem('msgList') || '[]');
    // console.log('chat: ', chat);

    if (this.sessionId) {
      this.getStatus().then(
        (res: any) => {
          if (!res) {
            localStorage.removeItem('sessionId');
            localStorage.removeItem('character');
            localStorage.removeItem('msgList');
            this.startInterview();
          }
        },
        (error: any) => {
          console.log(error);
          if (error.status == 404) {
            localStorage.removeItem('sessionId');
            localStorage.removeItem('character');
            localStorage.removeItem('msgList');
            this.startInterview();
          }
        }
      );
    } else {
      this.startInterview();
    }
  }
  async startInterview() {
    let status = await this.checkStatus();
    if (status == 'OK') {
      this.startSession();
    }
  }

  getEvents() {
    return new Promise((resolve, reject) => {
      this.serverRequest
        .getFromServer(
          this.serverRequest.getBaseUrl() +
            '/events?sessionId=' +
            this.sessionId
        )
        .then((record: any) => {
          // record = JSON.parse(record);
          record.filter((chat: any) => {
            if (typeof chat.text != 'undefined') {
              this.msgList.push({ user: 'Inworld User', message: chat.text });
            }
          });
          localStorage.setItem('msgList', JSON.stringify(this.msgList));
          resolve(true);
        })
        .catch((error: any) => {
          console.log('getEvents error:', error.statusText);
        });
    });
  }

  getStatus() {
    return new Promise((resolve, reject) => {
      this.serverRequest
        .getFromServer(
          this.serverRequest.getBaseUrl() +
            '/session/' +
            this.sessionId +
            '/status'
        )
        .then((record: any) => {
          console.log(record);
          resolve(record);
        })
        .catch((error: any) => {
          console.log('getStatus error:', error.statusText);
          reject(error);
        });
    });
  }

  checkStatus() {
    return new Promise((resolve, reject) => {
      this.serverRequest
        .getTextFromServer(this.serverRequest.getBaseUrl() + '/status')
        .then((record: any) => {
          resolve(record);
        })
        .catch((error: any) => {
          console.log('checkStatus error:', error.statusText);
        });
    });
  }

  startSession() {
    let bodyData = {
      uid: this.uId,
      sceneId: this.sceneId,
      characterId: this.characterId,
      playerName: this.playerName,
      serverId: this.serverId,
    };

    this.serverRequest
      .postOnServer(this.serverRequest.getBaseUrl() + '/session/open', bodyData)
      .then((record: any) => {
        console.log(record);
        this.sessionId = record.sessionId;
        localStorage.setItem('sessionId', record.sessionId);
        if (typeof record.character != 'undefined') {
          this.character.id = record.character.id;
          this.character.resourceName = record.character.resourceName;
          this.character.displayName = record.character.displayName;
          localStorage.setItem('character', JSON.stringify(record.character));

          this.sceneTrigger('new-user-joins');
          this.getEvents();
        }
      })
      .catch((error: any) => {
        console.log('startSession error:', error.statusText);
      });

    // let record = {
    //   sessionId:
    //     'default-idlh10_ibjsptvmnan4-ja:33e86eca-d471-4871-aa76-686711e440e7',
    //   character: {
    //     id: '12e8cc7e-c3cc-4044-ada0-0ce9a7612181',
    //     resourceName:
    //       'workspaces/default-idlh10_ibjsptvmnan4-ja/characters/clone-4fo6djgjsucwunirain45a',
    //     displayName: '2_\\Michael Middlebottom',
    //   },
    //   characters: [
    //     {
    //       id: '12e8cc7e-c3cc-4044-ada0-0ce9a7612181',
    //       resourceName:
    //         'workspaces/default-idlh10_ibjsptvmnan4-ja/characters/clone-4fo6djgjsucwunirain45a',
    //       displayName: '2_Michael Middlebottom',
    //     },
    //   ],
    // };
    // debugger;
    // localStorage.setItem('sessionId', record.sessionId);
    // localStorage.setItem('character', JSON.stringify(record.character));
  }

  onFocus() {
    setTimeout(() => {
      // this.content.resize();
      // this.content.scrollToBottom();
    }, 400);
  }

  inputChange() {
    // if (this.editorMsg.trim()) {
    //   this.sendBtnDisabled = false;
    // } else {
    //   this.sendBtnDisabled = true;
    // }
  }

  sendMsg() {
    var me = this;
    // this.messageInput.setFocus();
    if (!this.editorMsg.trim().length) return;

    this.sendMessage(me.editorMsg).then(
      (res: any) => {
        me.editorMsg = '';
      },
      (error) => {
        console.log(error);
      }
    );

    // me.sendBtnDisabled = true;
    // this.sendSpinner = true;

    // this.messageInput.setFocus();

    // let bodyData =
    //   'task_id=' + this.taskId + '&message=' + this.editorMsg.trim();

    // // temp store message in variable
    // var tempMsg = me.editorMsg;
    // me.editorMsg = '';

    // console.log(bodyData);

    // this.serverRequest
    //   .postOnServerWithHeader(
    //     this.serverRequest.getBaseUrl() + '/messages/create',
    //     bodyData,
    //     this.userToken
    //   )
    //   .then((record) => {
    //     me.editorMsg = '';
    //     this.getMsgs();
    //     this.scrollToBottom();
    //     this.sendSpinner = false;
    //   })
    //   .catch((error) => {
    //     if (tempMsg) {
    //       me.editorMsg = tempMsg;
    //     }
    //     me.sendBtnDisabled = !me.sendBtnDisabled;
    //     this.sendSpinner = false;
    //     console.log(error.error);
    //     this.serverRequest.presentToast(
    //       this.serverRequest.serverErrorHandler(error.error)
    //     );
    //   });
  }

  giveFeedback() {
    this.sceneTrigger('give_feedback').then(
      (res: any) => {},
      (error) => {
        console.log(error);
      }
    );
  }

  askQuestion() {
    this.sceneTrigger('ask_question').then(
      (res: any) => {},
      (error) => {
        console.log(error);
      }
    );
  }

  repeatQuestion() {
    this.sceneTrigger('repeat_question').then(
      (res: any) => {},
      (error) => {
        console.log(error);
      }
    );
  }

  endInterview() {
    let con = confirm('Are you sure you want to End Interview?');
    if (con) {
      this.sceneTrigger('end_interview').then(
        (res: any) => {
          this.closeSession();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  sendMessage(msg: any) {
    return new Promise((resolve, reject) => {
      if (!this.sessionId.trim()) {
        reject('Session is not started');
        return;
      }

      let bodyData = {
        message: msg,
      };
      this.serverRequest
        .postOnServer(
          this.serverRequest.getBaseUrl() +
            '/session/' +
            this.sessionId +
            '/message',
          bodyData
        )
        .then((record: any) => {
          console.log(record);
          if (record.length) {
            this.msgList.push({ user: this.playerName, message: msg });
            this.getEvents();
            resolve(true);
          }
        })
        .catch((error: any) => {
          console.log('sendMessage error:', error.statusText);
          if (error.status == 202) {
            this.msgList.push({ user: this.playerName, message: msg });
            this.getEvents();
            resolve(true);
          } else if (error.status == 404) {
            reject('Session has expired');
          } else {
            reject(error);
          }
        });
    });
  }

  sceneTrigger(eventId: any) {
    return new Promise((resolve, reject) => {
      this.serverRequest
        .getFromServer(
          this.serverRequest.getBaseUrl() +
            '/session/' +
            this.sessionId +
            '/custom/' +
            eventId
        )
        .then((record: any) => {
          console.log('Event trigger : ', eventId);
          console.log(record);
          this.getEvents();
          resolve(record);
        })
        .catch((error: any) => {
          console.log('sceneTrigger error:', error.statusText);
          if (error.status == 202) {
            this.getEvents();
            resolve(true);
          }
          reject(error);
        });
    });
  }

  closeSession() {
    this.serverRequest
      .getFromServer(
        this.serverRequest.getBaseUrl() +
          '/session/' +
          this.sessionId +
          '/close'
      )
      .then((record: any) => {
        console.log(record);
      })
      .catch((error: any) => {
        console.log('closeSession error:', error.statusText);
      });
  }
}
