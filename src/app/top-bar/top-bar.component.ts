import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { UrlPathService } from "../services/url-path.service";

@Component({
  selector: "app-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.css"]
})
export class TopBarComponent implements OnInit {
  headerText: string;
  showProgressBar: boolean;
  isAdminMenu: boolean = false;

  constructor(
    private actRouter: ActivatedRoute,
    private router: Router,
    private prevurl: UrlPathService
  ) {}

  ngOnInit() {
    this.prevurl.sharedHeaderText.subscribe(headerText => {
      this.headerText = headerText;
    });

    this.prevurl.sharedLoadingAnimation.subscribe(isdisplayed => {
      this.showProgressBar = isdisplayed;
    });

    // Get Current URL
    this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        const pathParam = event.state.root.firstChild.url[0].path;

        if (String(pathParam) === "admin") {
          this.isAdminMenu = true;
        } else {
          this.isAdminMenu = false;
        }
      }
    });
  }

  adminLogout() {
    this.router.navigateByUrl("/admin/logout");
  }
}
