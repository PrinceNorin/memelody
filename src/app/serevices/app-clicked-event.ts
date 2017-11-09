import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AppClickedEvent {
  private event: EventEmitter<any>;

  constructor() {
    this.event = new EventEmitter();
  }

  emit(event?: any) {
    this.event.emit(event);
  }

  subscribe(next?: any, error?: any, complete?: any): any {
    return this.event.subscribe(next, error, complete);
  }
}
