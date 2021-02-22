import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export default class MessageService {
  messages: string[] = [];

  add(message: string): void {
    this.messages.push(message);
  }

  clear(): void {
    this.messages = [];
  }
}
