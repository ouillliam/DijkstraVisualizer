import { TestBed } from '@angular/core/testing';

import { AnimatePathService } from './animate-path.service';

describe('AnimatePathService', () => {
  let service: AnimatePathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimatePathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
