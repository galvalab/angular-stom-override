import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { SnDetailService } from "../services/sn-detail.service";
import { GetDashboardDataService } from "../services/get-dashboard-data.service";
import { GetGeolocationService } from "../services/get-geolocation.service";
import { UrlPathService } from "../services/url-path.service";

export interface modInfo {
  ip: string;
  lat: number;
  long: number;
  acc: number;
  tstamp: number;
  newSn: string;
  newBarcode: string;
  boxSn: string;
}

@Component({
  selector: "app-edit-page",
  templateUrl: "./edit-page.component.html",
  styleUrls: ["./edit-page.component.css"]
})
export class EditPageComponent implements OnInit {
  @Output() retrievedClientId = new EventEmitter<modInfo>();

  snPicUrl: string = "";

  loadBarcodeImage = false;

  snValue = "Clear me";

  barcodeValue = "Clear me";

  boxSnValue = "";

  ip: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;

  constructor(
    private snDetail: SnDetailService,
    private dashData: GetDashboardDataService,
    private geoloc: GetGeolocationService,
    private urlpath: UrlPathService
  ) {}

  ngOnInit() {
    this.snDetail.sharedSerialNumber.subscribe(param => {
      this.snValue = param;
    });

    this.snDetail.sharedSnRead.subscribe(param => {
      this.barcodeValue = param;
    });

    this.snDetail.sharedBoxSnValue.subscribe(param => {
      this.boxSnValue = param;
    });

    this.snDetail.sharedSnPicRef.subscribe(param => {
      // Display loading animation
      this.loadBarcodeImage = true;

      // Clear image
      this.snPicUrl =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

      this.dashData.getImage(param).subscribe(imgParam => {
        if (imgParam != null) {
          this.snPicUrl = imgParam.Body.Row[0][2];

          this.getClientID();
        } else {
          this.snPicUrl =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
        }

        this.loadBarcodeImage = false;
      });
    });
  }

  getClientID() {
    this.dashData.getClientIp().subscribe((param: string) => {
      this.geoloc.getCurrentPosition().subscribe((pos: Position) => {
        this.ip = param["ip"];
        this.latitude = pos.coords.latitude;
        this.longitude = pos.coords.longitude;
        this.accuracy = pos.coords.accuracy;
        this.timestamp = pos.timestamp;

        // this.retrievedClientId.emit(foundId);
      });
    });
  }

  saveModification(NewSn: string, NewBarcode: string, BoxSn: string) {
    // Start the animation
    this.urlpath.setLoadingAnimation(true);

    this.dashData.getClientIp().subscribe((param: string) => {
      this.geoloc.getCurrentPosition().subscribe((pos: Position) => {
        const newModif: modInfo = {
          ip: param["ip"],
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
          acc: pos.coords.accuracy,
          tstamp: pos.timestamp,
          newSn: NewSn,
          newBarcode: NewBarcode,
          boxSn: BoxSn
        };

        this.retrievedClientId.emit(newModif);
      });
    });
  }
}
