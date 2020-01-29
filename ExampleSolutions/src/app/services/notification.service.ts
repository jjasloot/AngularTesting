import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showAlert(text: string) {
    window.alert(text);
  }
}
