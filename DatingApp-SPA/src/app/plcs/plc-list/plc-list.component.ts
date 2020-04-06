import { Component, OnInit } from '@angular/core';
import { Plc } from '../../_models/plc';
import { SignalRService } from '../../_services/signal-r.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { PlcService } from '../../_services/plc.service';

@Component({
  selector: 'app-plc-list',
  templateUrl: './plc-list.component.html',
  styleUrls: ['./plc-list.component.css']
})
export class PlcListComponent implements OnInit {
  registerMode = false;
  plcs: Plc[];  
  pagination: Pagination;

  constructor(
    private plcService: PlcService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private signalRService: SignalRService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.plcs = data['plcs'].result;
      this.pagination = data['plcs'].pagination;
    });
      this.signalRService.signalReceived.subscribe((plcIncoming: Plc) => {
      this.plcs.push(plcIncoming);
    });    
  }

  loadPlcs() {
    this.plcService
      .getPlcs(
        this.pagination.currentPage,
        this.pagination.itemsPerPage        
      )
      .subscribe(
        (res: PaginatedResult<Plc[]>) => {
          this.plcs = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.alertify.error(error);
        }
      );
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadPlcs();
  }
}
// @Component({
//   selector: 'app-plc-list',
//   templateUrl: './plc-list.component.html',
//   styleUrls: ['./plc-list.component.css']
// })
// export class PlcListComponent implements OnInit {
//   signalList: Plcs[] = [];

//   constructor(
//     private signalRService: SignalRService) {}

//     ngOnInit() {
//       this.signalRService.signalReceived.subscribe((signal: Plcs) => {
//         this.signalList.push(signal);
//       });
//    }
//}
