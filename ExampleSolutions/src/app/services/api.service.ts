import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IpAddress } from '../interfaces/ipAddress.interface';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }


  getMyIp(): Observable<string> {
    return this.httpClient.get<IpAddress>('https://api.ipify.org/?format=json').pipe(map(a => a.ip));
  }
}
