import { TestBed } from '@angular/core/testing';

import { TimeCardsService } from './time-cards.service';

describe('TimeCardsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeCardsService = TestBed.get(TimeCardsService);
    expect(service).toBeTruthy();
  });
});
