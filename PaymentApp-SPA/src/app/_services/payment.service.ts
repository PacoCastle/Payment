import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../_models/payment';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}  

  getPayments(
    page?, 
    itemsPerPage?
    ): Observable<PaginatedResult<Payment[]>>{
    const paginatedResult: PaginatedResult<Payment[]> = new PaginatedResult<
    Payment[]
    >();

    let params = new HttpParams();
    
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http
      .get<Payment[]>(this.baseUrl + 'payments', { 
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

  getPayment(id):Observable<Payment>
  {
    //return this.http.get<Plc[]>(this.baseUrl + 'plcs' + deviceId,httpOptions)
    return this.http.get<Payment>(this.baseUrl + 'payments/' + id)
  }

  register(payment: Payment) {
    return this.http.post(this.baseUrl + 'payments', payment);
  }

  updatePayment(id: number,payment: Payment) {
    return this.http.put(this.baseUrl + 'payments/' + id , payment);
  }
  deletePayment(id: number) {
    return this.http.delete(
      this.baseUrl + 'payments/' + id,
      {}
    );
  }
}
