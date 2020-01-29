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

  it('should call the web service and transform the response', (done) => {
    const httpTestingController: HttpTestingController = TestBed.get(HttpTestingController);

    service.getMyIp().subscribe(ip => {
      expect(ip).toBe('1.2.3.4');
      done()
    });

    // test for exactly one request
    const httpRequest = httpTestingController.expectOne('https://api.ipify.org/?format=json');

    // return a fake answer
    httpRequest.flush({ ip: '1.2.3.4' });

    // analyze the request
    expect(httpRequest.request.method === 'GET');

    // test no remaining open requests
    httpTestingController.verify();
  });
});
