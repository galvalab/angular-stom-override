import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";

@Injectable()
export class GetGeolocationService {
  constructor() {}

  getCurrentPosition(): Observable<Position> {
    return Observable.create((observer: Observer<Position>) => {
      // Invokes getCurrentPosition method of Geolocation API.
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          observer.next(position);
          observer.complete();
        },
        (error: PositionError) => {
          console.log("Geolocation service: " + error.message);
          observer.error(error);
        }
      );
    });
  }
}
