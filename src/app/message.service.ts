import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export default class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
