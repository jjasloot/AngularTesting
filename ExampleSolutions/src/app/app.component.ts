import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'This is a title';
  time = new Date();
  ip: string;
  numberInformation: string;

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService) { }
  ngOnInit() {
    this.updateTime();
  }

  updateTime() {
    this.time = new Date();
    const secondsLeft = 60 - this.time.getSeconds();
    setTimeout(() => this.updateTime(), secondsLeft * 1000);
  }

  getMyIp() {
    this.apiService.getMyIp().subscribe(ip => {
      this.ip = ip;
    }, err => this.notificationService.showAlert('Fout:' + err))
  }
  isNumberEven(number: number) {
    return number % 2 === 0;
  }
  updateNumber(number: number) {
    if (this.isNumberEven(number)) {
      this.numberInformation = 'Facinating, that is 2 times ' + number / 2;
    } else {
      this.numberInformation = 'Interesting, that is half of ' + number * 2;
    }
  }
}

