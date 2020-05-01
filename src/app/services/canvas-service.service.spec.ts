import { TestBed } from '@angular/core/testing';

import { CanvasService } from './canvas-service.service';

describe('CanvasServiceService', () => {
  let service: CanvasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
