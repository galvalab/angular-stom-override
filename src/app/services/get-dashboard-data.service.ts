import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// import { Observable } from "rxjs";

export interface dataType {
  reference: string;
  datetime: string;
  data: any[];
}

export interface generalHeader{
  Status: string;
  Description: string;
}

export interface generalBody{
  ColumnName: [];
  Row: [[]];
}

export interface generalType {
  Header: generalHeader;
  Body: generalBody;
}

@Injectable()
export class GetDashboardDataService {
  constructor(private http: HttpClient) {}

  getLoginStatus(username: string, password: string) {
    const url =
      "https://dems.galva.co.id/stom/dashboard/AdminLoginVerification.ashx?u=" +
      username +
      "&p=" +
      password;

    return this.http.get<generalType>(url);
  }

  getOverrideList() {
    const url =
      "https://dems.galva.co.id/stom/override/GetStomOverrideList.ashx";

    return this.http.get<generalType>(url);
  }

  getImage(storef: string) {
    return this.http.get<generalType>(
      "https://dems.galva.co.id/stom/mobile/GetStomImage.ashx?storef=" + storef
    );
  }

  getModifiedList() {
    const url =
      "https://dems.galva.co.id/stom/override/GetStomOVModifiedList.ashx";

    return this.http.get<generalType>(url);
  }

  getClientIp() {
    const url = "https://api.ipify.org/?format=json";

    return this.http.get<string>(url);
  }
}
