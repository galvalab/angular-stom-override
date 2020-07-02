import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SnDetailService } from "../services/sn-detail.service";

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  sn: string;
  model: string;
  address: string;
  barcode: string;
  agentname: string;
  username: string;

  clientIp: string;
  geotag: string;
  modifiedDT: string;
  barcodeBefore: string;
  barcodeAfter: string;
  modifiedBy: string;

  @Input() isChecked: boolean;
  @Output() saveModification: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private snDetail: SnDetailService
  ) { }

  ngOnInit() {
    this.snDetail.sharedSerialNumber.subscribe(param => {
      this.sn = param;
    });

    this.snDetail.sharedDevModel.subscribe(param => {
      this.model = param;
    });

    this.snDetail.sharedDevAddress.subscribe(param => {
      this.address = param;
    });

    this.snDetail.sharedSnRead.subscribe(param => {
      this.barcode = param;
    });

    this.snDetail.sharedAgentName.subscribe(param => {
      this.agentname = param;
    });

    this.snDetail.sharedLoginUser.subscribe(param => {
      this.username = param;
    });


    this.snDetail.sharedClientIp.subscribe(param => {
      this.clientIp = param;
    });
    this.snDetail.sharedGeotag.subscribe(param => {
      this.geotag = param;
    });
    this.snDetail.sharedModifiedDateTime.subscribe(param => {
      this.modifiedDT = param;
    });
    this.snDetail.sharedBarcodeReadBefore.subscribe(param => {
      this.barcodeBefore = param;
    });
    this.snDetail.sharedBarcodeReadAfter.subscribe(param => {
      this.barcodeAfter = param;
    });
    this.snDetail.sharedModifiedBy.subscribe(param => {
      this.modifiedBy = param;
    });
  }

}