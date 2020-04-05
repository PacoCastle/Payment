import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plcs } from '../_models/plcs';

@Injectable({
  providedIn: 'root'
})
export class PlcService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}  

  getPlcs(): Observable<Plcs[]>
  {
    //return this.http.get<Plc[]>(this.baseUrl + 'plcs', httpOptions);
    return this.http.get<Plcs[]>(this.baseUrl + 'plcs');
  }

  getPlcForDevice(deviceId):Observable<Plcs[]>
  {
    //return this.http.get<Plc[]>(this.baseUrl + 'plcs' + deviceId,httpOptions)
    return this.http.get<Plcs[]>(this.baseUrl + 'plcs' + deviceId)
  }
}
