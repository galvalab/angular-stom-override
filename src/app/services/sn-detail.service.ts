import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SnDetailService {
  private snID = new BehaviorSubject('');
  sharedSnID = this.snID;

  private serialNumber = new BehaviorSubject('');
  sharedSerialNumber = this.serialNumber;

  private devAttributeID = new BehaviorSubject('');
  sharedDevAttributeID = this.devAttributeID;

  private devModel = new BehaviorSubject('');
  sharedDevModel = this.devModel;

  private devAddress = new BehaviorSubject('');
  sharedDevAddress = this.devAddress;

  private snRead = new BehaviorSubject('');
  sharedSnRead = this.snRead;

  private snPicRef = new BehaviorSubject('');
  sharedSnPicRef = this.snPicRef;

  private agentID = new BehaviorSubject('');
  sharedAgentID = this.agentID;

  private agentName = new BehaviorSubject('');
  sharedAgentName = this.agentName;

  private loginUser = new BehaviorSubject('');
  sharedLoginUser = this.loginUser;



  private clientIp = new BehaviorSubject('');
  sharedClientIp = this.clientIp;

  private geotag = new BehaviorSubject('');
  sharedGeotag = this.geotag;

  private modifiedDateTime = new BehaviorSubject('');
  sharedModifiedDateTime = this.modifiedDateTime;

  private barcodeReadBefore = new BehaviorSubject('');
  sharedBarcodeReadBefore = this.barcodeReadBefore;

  private barcodeReadAfter = new BehaviorSubject('');
  sharedBarcodeReadAfter = this.barcodeReadAfter;

  private modifiedBy = new BehaviorSubject('');
  sharedModifiedBy = this.modifiedBy;

  constructor() { }

  setSnID(snID: string) {
    this.snID.next(snID);
  }

  setSerialNumber(serialNumber: string) {
    this.serialNumber.next(serialNumber);
  }

  setDeviceAttributeID(devAttributeID: string) {
    this.devAttributeID.next(devAttributeID);
  }

  setDeviceModel(devModel: string) {
    this.devModel.next(devModel);
  }

  setDeviceAddress(devAddress: string) {
    this.devAddress.next(devAddress);
  }

  setSnRead(snRead: string) {
    this.snRead.next(snRead);
  }

  setSnPicRef(snPicRef: string) {
    this.snPicRef.next(snPicRef);
  }

  setAgentID(agentID: string) {
    this.agentID.next(agentID);
  }

  setAgentName(agentName: string) {
    this.agentName.next(agentName);
  }

  setLoginUser(loginUser: string) {
    this.loginUser.next(loginUser);
  }


  setClientIp(clientIp: string) {
    this.clientIp.next(clientIp);
  }
  setGeotag(geotag: string) {
    this.geotag.next(geotag);
  }
  setModifiedDateTime(modifiedDateTime: string) {
    this.modifiedDateTime.next(modifiedDateTime);
  }
  setBarcodeReadBefore(barcodeReadBefore: string) {
    this.barcodeReadBefore.next(barcodeReadBefore);
  }
  setBarcodeReadAfter(barcodeReadAfter: string) {
    this.barcodeReadAfter.next(barcodeReadAfter);
  }
  setModifiedBy(modifiedBy: string) {
    this.modifiedBy.next(modifiedBy);
  }

}