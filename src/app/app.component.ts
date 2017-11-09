import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AppClickedEvent } from './serevices/app-clicked-event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MeMelody';

  constructor(private event: AppClickedEvent, title: Title) {
    title.setTitle(this.title);
  }

  onClick(event) {
    this.event.emit(event);
  }
}
