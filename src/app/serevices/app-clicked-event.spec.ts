import { TestBed, inject } from '@angular/core/testing';

import { AppClickedEventService } from './app-clicked-event.service';

describe('AppClickedEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppClickedEventService]
    });
  });

  it('should be created', inject([AppClickedEventService], (service: AppClickedEventService) => {
    expect(service).toBeTruthy();
  }));
});
