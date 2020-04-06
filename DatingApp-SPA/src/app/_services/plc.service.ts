import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plc } from '../_models/plc';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class PlcService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}  

  getPlcs(
    page?, 
    itemsPerPage?
    ): Observable<PaginatedResult<Plc[]>>{
    const paginatedResult: PaginatedResult<Plc[]> 
    = new PaginatedResult<Plc[]>();

    let params = new HttpParams();
    
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http
      .get<Plc[]>(this.baseUrl + 'plcs', { 
        observe: 'response', 
        params 
      })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }

  getPlc(id):Observable<Plc>
  {
    //return this.http.get<Plc[]>(this.baseUrl + 'plcs' + deviceId,httpOptions)
    return this.http.get<Plc>(this.baseUrl + 'plcs/' + id)
  }

  register(plc: Plc) {
    return this.http.post(this.baseUrl + 'plcs', plc);
  }

  updatePlc(id: number,plc: Plc) {
    return this.http.put(this.baseUrl + 'plcs/' + id , plc);
  }
}
