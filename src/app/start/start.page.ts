import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  username: any = '';

  constructor(private router: Router) {}

  ngOnInit() {}
  startInterview() {
    if (this.username == '') return;
    localStorage.setItem('userName', this.username);
    let serverId = Math.floor(1000 + Math.random() * 9000);
    localStorage.setItem('serverId', serverId.toString());
    this.router.navigate(['tab1/']); // + this.name
  }
}
