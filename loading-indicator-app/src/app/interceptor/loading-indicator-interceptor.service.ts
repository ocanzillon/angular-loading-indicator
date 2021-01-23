import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, PartialObserver } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoadingIndicatorService } from '../service/loading-indicator.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorInterceptor implements HttpInterceptor {

  // Observer that stops the loading indicator when the HTTP call completes or throws an error
  private readonly observer: PartialObserver<any> = {
    error: () => this.loadingIndicatorService.stop(),
    complete: () => this.loadingIndicatorService.stop()
  };

  constructor(private readonly loadingIndicatorService: LoadingIndicatorService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Start the loading indicator
    this.loadingIndicatorService.start();

    // Return the original request
    return next.handle(req)
      // Tap the request to add the behavior of the observer stopping the loading indicator
      .pipe(tap(this.observer));
  }

}
