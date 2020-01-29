import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  beforeEach(() => TestBed.configureTestingModule({ imports: [HttpClientTestingModule] }));

  beforeEach(() => {
    service = TestBed.get(ApiService);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
