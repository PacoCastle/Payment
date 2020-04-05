/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlcService } from './plc.service';

describe('Service: Product', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlcService]
    });
  });

  it('should ...', inject([PlcService], (service: PlcService) => {
    expect(service).toBeTruthy();
  }));
});
