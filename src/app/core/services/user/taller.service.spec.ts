import { TestBed } from '@angular/core/testing';

import { TallerService } from './taller.service';

describe('UserService', () => {
  let service: TallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
