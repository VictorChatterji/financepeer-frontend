import { TestBed } from '@angular/core/testing';

import { SensitiveService } from './sensitive.service';

describe('SensitiveService', () => {
  let service: SensitiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensitiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
