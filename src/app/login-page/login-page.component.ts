import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { MatSnackBar } from "@angular/material/snack-bar";

import { GetDashboardDataService } from "../services/get-dashboard-data.service";
import { UrlPathService } from "../services/url-path.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
hide = true;
  durationInSeconds = 5;

  constructor(
    private dashData: GetDashboardDataService,
    private router: Router,
    private urlpath: UrlPathService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Clear Auth
    this.clearAuth();

    this.urlpath.setHeaderText("STOM Override Page");
    // this.urlpath.setBackButton(false);
  }

  openSnackBar() {
    this.snackBar.openFromComponent(WrongCredSnackbarComponent, {
      duration: this.durationInSeconds * 1000
    });
  }

  clearAuth() {
    localStorage.setItem("isAuth", null);
  }

  getAgentID(username: string, password: string) {
    this.urlpath.setLoadingAnimation(true);

    this.dashData.getLoginStatus(username, password).subscribe(resp => {
      const logResp = String(resp.Body.Row[0][0]);

      if (logResp === "True") {
        localStorage.setItem("isAuth", "true");

        localStorage.setItem("loginUser", username);

        this.router.navigateByUrl("/admin");
      } else {
        this.openSnackBar();
      }

      this.urlpath.setLoadingAnimation(false);
    });
  }
}

@Component({
  selector: "app-wrong-cred",
  templateUrl: "wrong-cred-snackbar.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class WrongCredSnackbarComponent {}
