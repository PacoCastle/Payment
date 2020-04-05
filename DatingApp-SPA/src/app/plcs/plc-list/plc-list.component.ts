import { Component, OnInit } from '@angular/core';
import { Plcs } from '../../_models/plcs';
import { SignalRService } from '../../_services/signal-r.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-plc-list',
  templateUrl: './plc-list.component.html',
  styleUrls: ['./plc-list.component.css']
})
export class PlcListComponent implements OnInit {
  signalList: Plcs[] = [];

  constructor(
    private signalRService: SignalRService) {}

    ngOnInit() {
      this.signalRService.signalReceived.subscribe((signal: Plcs) => {
        this.signalList.push(signal);
      });
    }
}
