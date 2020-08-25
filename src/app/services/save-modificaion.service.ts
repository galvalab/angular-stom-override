import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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

export interface generalHeader {
  Status: string;
  Description: string;
}

export interface generalBody {
  ColumnName: [];
  Row: [[]];
}

export interface generalType {
  Header: generalHeader;
  Body: generalBody;
}

@Injectable()
export class SaveModificaionService {
  constructor(private http: HttpClient) {}

  saveModificationData(saveParam: saveType) {
    var formData: any = new FormData();
    formData.append("devattrid", saveParam.devattrid);
    formData.append("barcode", saveParam.barcode);
    formData.append("loginuser", saveParam.loginuser);
    formData.append("clientip", saveParam.clientip);
    formData.append("acc", saveParam.acc);
    formData.append("lat", saveParam.lat);
    formData.append("long", saveParam.long);
    formData.append("timestamp", saveParam.timestamp);
    formData.append("snid", saveParam.snid);
    formData.append("sn", saveParam.sn);

    const url =
      "https://dems.galva.co.id/stom/override/InsertStomOverrideSN.ashx";

    return this.http.post<generalType>(url, formData);
  }

  saveBoxSN(saveParam: saveType) {
    var formData: any = new FormData();
    formData.append("devattrid", saveParam.devattrid);
    formData.append("barcode", "");
    formData.append("loginuser", saveParam.loginuser);
    formData.append("clientip", saveParam.clientip);
    formData.append("acc", saveParam.acc);
    formData.append("lat", saveParam.lat);
    formData.append("long", saveParam.long);
    formData.append("timestamp", saveParam.timestamp);
    formData.append("snid", saveParam.snid);
    formData.append("snbox", saveParam.sn);

    const url =
      "https://dems.galva.co.id/stom/override/InsertStomOverrideSNBox.ashx";

    return this.http.post<generalType>(url, formData);
  }
}
