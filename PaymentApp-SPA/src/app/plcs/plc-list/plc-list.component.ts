import { Component, OnInit } from '@angular/core';
import { Plc } from '../../_models/plc';
import { SignalRService } from '../../_services/signal-r.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { PlcService } from '../../_services/plc.service';
//import * as jsPDF from 'jspdf';
//import 'jspdf-autotable';
import * as faker from 'faker';
declare var jsPDF: any;



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
  headRows() {
    return [{id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum'}];
  }

    footRows() {
    return [{id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum'}];
  }

   bodyRows(rowCount) {
    let body = [];
    for (let a=0;a <this.plcs.length;a++) {
      body.push({
        id: a,
        name: this.plcs[a].id,
        email: this.plcs[a].deviceId,
        city: this.plcs[a].campo1,
        expenses: this.plcs[a].campo2,
      });
    }
    return body;
  }
  createPdf() {
    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('With content', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);

    // jsPDF 1.4+ uses getWidth, <1.4 uses .width
    var pageSize = doc.internal.pageSize;
    var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    var text = doc.splitTextToSize(faker.lorem.sentence(45), pageWidth - 35, {});
    doc.text(text, 14, 30);

    doc.autoTable({
      head: this.headRows(),
      body: this.bodyRows(40),
      startY: 50,
      showHead: 'firstPage'
    });

    doc.text('Pie de página ...', 14, doc.autoTable.previous.finalY + 10);

    doc.save('table.pdf');
  }

}
  // DownloadReport(){  
  //   let row : any[] = []
  //   let rowD : any[] = []
  //   let col=['Segment','Title','Total','Description'   ]; // initialization for headers
  //   let title = "Sample Report" // title of report
  //   for(let a=0;a <this.plcs.length;a++){
  //     row.push(this.plcs[a].id)
  //     row.push(this.plcs[a].deviceId)
  //     row.push(this.plcs[a].campo1)      
  //     rowD.push(row);
  //     row =[];
  //   }
  //   this.getReport(col , rowD , title );
  // }

  // getReport(col: any[], rowD: any[], title: any) {
  //   const totalPagesExp = "{total_pages_count_string}";        
  //   let pdf = new jsPDF('l', 'pt', 'legal');
  //   pdf.setTextColor(51, 156, 255);
  //   pdf.text("Sample1", 450, 40);
  //   pdf.text("Email:", 450, 60); // 450 here is x-axis and 80 is y-axis
  //   pdf.text("Phone:", 450, 80); // 450 here is x-axis and 80 is y-axis
  //   pdf.text("" + title, 435,100);  //
  //   pdf.setLineWidth(1.5);
  //   pdf.line(5, 107, 995, 107)
  //   var pageContent = function (data) {
  //       // HEADER
       
  //       // FOOTER
  //       var str = "Page " + data.pageCount;
  //       // Total page number plugin only available in jspdf v1.0+
  //       if (typeof pdf.putTotalPages === 'function') {
  //           str = str + " of " + totalPagesExp;
  //       }
  //       pdf.setFontSize(10);
  //       var pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
  //       pdf.text(str, data.settings.margin.left, pageHeight - 10); // showing current page number
  //   };
  //   pdf.autoTable(col, rowD,
  //       {
  //           addPageContent: pageContent,
  //           margin: { top: 110 },
  //       });

  //   //for adding total number of pages // i.e 10 etc
  //   if (typeof pdf.putTotalPages === 'function') {
  //       pdf.putTotalPages(totalPagesExp);
  //   }

  //   pdf.save(title + '.pdf');
  // }
//}

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
