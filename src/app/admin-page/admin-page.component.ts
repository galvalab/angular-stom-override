import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";

import { of, from } from "rxjs";

import { GetDashboardDataService } from "../services/get-dashboard-data.service";

import { UrlPathService } from "../services/url-path.service";

import { SnDetailService } from "../services/sn-detail.service";

import { SaveModificaionService } from "../services/save-modificaion.service";

export interface OverrideListElement {
  SNID: string;
  SerialNumber: string;
  DeviceAttributeID: string;
  DeviceModel: string;
  DeviceAddress: string;
  SnRead: string;
  SnPicRef: string;
  AgentID: string;
  AgentName: string;
  LoginUser: string;

  ClientIP: string;
  GeoTag: string;
  ModifyDateTime: string;
  ReadBefore: string;
  ReadAfter: string;
  ModifiedBy: string;
}

export interface modInfo {
  ip: string;
  lat: number;
  long: number;
  acc: number;
  tstamp: number;
  newSn: string;
  newBarcode: string;
}

export interface saveType {
  devattrid: number;
  barcode: string;
  loginuser: string;
  clientip: string;
  acc: number;
  lat: number;
  long: number;
  timestamp: number;
  snid: number;
  sn: string;
}

@Component({
  selector: "app-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.css"]
})
export class AdminPageComponent implements OnInit {
  highlightedSnRows = [];
  displayedSNColumns: string[] = [
    "SerialNumber",
    "DeviceModel",
    "DeviceAddress",
    "SnRead",
    "LoginUser"
  ];
  dataSource = new MatTableDataSource<OverrideListElement>();
  rowCount = -1;

  isChecked = false;
  checkedTitle = '"False Barcode Read"';
  checkedToggle = "[Modified List]";

  tblHeaderBackColor = "";
  tblHeaderFontColor = "";

  selectedDeviceAttributId = -1;
  selectedSnId = -1;

  constructor(
    private actRouter: ActivatedRoute,
    private router: Router,
    private dashData: GetDashboardDataService,
    private urlpath: UrlPathService,
    private snDetail: SnDetailService,
    private saveMod: SaveModificaionService
  ) {}

  ngOnInit() {
    this.checkAuth();

    this.urlpath.setHeaderText("STOM Override Dashboard");

    this.callOverrideWS(false);

    this.actRouter.paramMap.subscribe(params => {
      const adminCommand: string = params.get("adminCommand");

      if (adminCommand === "logout") {
        this.router.navigateByUrl("/");
      }
    });
  }

  checkAuth() {
    const isAuth = String(localStorage.getItem("isAuth")).toLowerCase();

    if (isAuth !== "true") {
      this.router.navigateByUrl("/");
    }
  }

  snRowClicked(row) {
    if (row != null) {
      this.highlightedSnRows = [];
      this.highlightedSnRows.push(row);

      // console.log(row.SNID);
      this.snDetail.setSnID(row.SNID);
      this.snDetail.setSerialNumber(row.SerialNumber);
      this.snDetail.setDeviceAttributeID(row.DeviceAttributeID);
      this.snDetail.setDeviceModel(row.DeviceModel);
      this.snDetail.setDeviceAddress(row.DeviceAddress);
      this.snDetail.setSnRead(row.SnRead);
      this.snDetail.setSnPicRef(row.SnPicRef);
      this.snDetail.setAgentID(row.AgentID);
      this.snDetail.setAgentName(row.AgentName);
      this.snDetail.setLoginUser(row.LoginUser);

      this.snDetail.setClientIp(row.ClientIP);
      this.snDetail.setGeotag(row.GeoTag);
      this.snDetail.setModifiedDateTime(row.ModifyDateTime);
      this.snDetail.setBarcodeReadBefore(row.ReadBefore);
      this.snDetail.setBarcodeReadAfter(row.ReadAfter);
      this.snDetail.setModifiedBy(row.ModifiedBy);

      this.selectedDeviceAttributId = row.DeviceAttributeID;
      this.selectedSnId = row.SNID;
    } else {
      this.highlightedSnRows = [];

      // console.log(row.SNID);
      this.snDetail.setSnID("");
      this.snDetail.setSerialNumber("");
      this.snDetail.setDeviceAttributeID("");
      this.snDetail.setDeviceModel("");
      this.snDetail.setDeviceAddress("");
      this.snDetail.setSnRead("");
      this.snDetail.setSnPicRef("");
      this.snDetail.setAgentID("");
      this.snDetail.setAgentName("");
      this.snDetail.setLoginUser("");

      this.snDetail.setClientIp("");
      this.snDetail.setGeotag("");
      this.snDetail.setModifiedDateTime("");
      this.snDetail.setBarcodeReadBefore("");
      this.snDetail.setBarcodeReadAfter("");
      this.snDetail.setModifiedBy("");

      this.selectedDeviceAttributId = -1;
      this.selectedSnId = -1;
    }
  }

  callOverrideWS(isModified: boolean) {
    // Start the animation
    this.urlpath.setLoadingAnimation(true);

    if (isModified) {
      this.dashData.getModifiedList().subscribe(resp => {
        let tempData: Array<OverrideListElement> = [];

        resp.Body.Row.forEach(item => {
          const sn: OverrideListElement = {
            SNID: item[0],
            SerialNumber: item[1],
            DeviceAttributeID: item[2],
            DeviceModel: item[3],
            DeviceAddress: item[4],
            SnRead: item[5],
            SnPicRef: item[6],
            AgentID: item[7],
            AgentName: item[8],
            LoginUser: item[9],

            ClientIP: item[10],
            GeoTag: item[11],
            ModifyDateTime: item[12],
            ReadBefore: item[13],
            ReadAfter: item[14],
            ModifiedBy: item[15]
          };

          tempData.push(sn);
        });

        this.dataSource.data = [];
        this.dataSource.data = tempData;

        this.rowCount = tempData.length;

        // Stop the animation
        this.urlpath.setLoadingAnimation(false);
      });
    } else {
      this.dashData.getOverrideList().subscribe(resp => {
        let tempData: Array<OverrideListElement> = [];

        resp.Body.Row.forEach(item => {
          const sn: OverrideListElement = {
            SNID: item[0],
            SerialNumber: item[1],
            DeviceAttributeID: item[2],
            DeviceModel: item[3],
            DeviceAddress: item[4],
            SnRead: item[5],
            SnPicRef: item[6],
            AgentID: item[7],
            AgentName: item[8],
            LoginUser: item[9],

            ClientIP: "",
            GeoTag: "",
            ModifyDateTime: "",
            ReadBefore: "",
            ReadAfter: "",
            ModifiedBy: ""
          };

          tempData.push(sn);
        });

        this.dataSource.data = [];
        this.dataSource.data = tempData;

        this.rowCount = tempData.length;

        // Stop the animation
        this.urlpath.setLoadingAnimation(false);
      });
    }
  }

  applySnFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayedList() {
    // Clear display
    this.snRowClicked(null);

    if (this.isChecked) {
      this.checkedTitle = '"False Barcode Read"';
      this.checkedToggle = "[Modified List]";

      this.tblHeaderBackColor = "";
      this.tblHeaderFontColor = "";

      this.callOverrideWS(false);
    } else {
      this.checkedTitle = '"Modified Barcode Read"';
      this.checkedToggle = "[False Read]";

      this.tblHeaderBackColor = "#7E57C2";
      this.tblHeaderFontColor = "white";

      this.callOverrideWS(true);
    }
  }

  public saveModification(newModif: modInfo) {
    if (this.selectedDeviceAttributId === -1 || this.selectedSnId === -1) {
      // display warning
      console.log("Row is not selected yet");
      
    } else {
      const tempSaveParam: saveType = {
        devattrid: this.selectedDeviceAttributId,
        barcode: newModif.newBarcode,
        loginuser: localStorage.getItem("loginUser"),
        clientip: newModif.ip,
        acc: newModif.acc,
        lat: newModif.lat,
        long: newModif.long,
        timestamp: newModif.tstamp,
        snid: this.selectedSnId,
        sn: newModif.newSn
      };

      console.log(tempSaveParam);

      this.saveMod.saveModificationData(tempSaveParam).subscribe(report => {
        this.snRowClicked(null);
        this.callOverrideWS(this.isChecked);
      });
    }
  }
}