import { Injectable } from '@angular/core';
import { Plc } from '../_models/plc';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { PlcService } from '../_services/plc.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PlcListResolver implements Resolve<Plc[]> { 
  pageNumber = 1;
  pageSize = 5; 

  constructor(
    private plcService: PlcService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Plc[]> {
    return this.plcService
    .getPlcs
    (this.pageNumber, 
      this.pageSize
      )
    .pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}