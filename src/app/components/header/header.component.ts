import { Component } from '@angular/core';

import { AppClickedEvent } from '../../serevices/app-clicked-event';

interface Lang {
  text: string
  value: string
}

@Component({
  selector: 'me-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {
  isLangOpen: boolean = false;
  currentLang: string = 'English';
  langs: Lang[] = [
    { text: 'English', value: 'en' },
    { text: 'ខ្មែរ', value: 'km' },
    { text: '日本語', value: 'jp' }
  ];

  constructor(appClickedEvent: AppClickedEvent) {
    appClickedEvent.subscribe(this._handleAppClicked.bind(this));
  }

  toggleLangs(event: MouseEvent) {
    event.stopPropagation();
    this.isLangOpen = !this.isLangOpen;
  }

  private _handleAppClicked(event) {
    this.isLangOpen = false;
  }
}
