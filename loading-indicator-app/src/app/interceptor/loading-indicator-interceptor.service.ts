import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, PartialObserver } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { LoadingIndicatorService } from '../service/loading-indicator.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorInterceptor implements HttpInterceptor {

  constructor(private readonly loadingIndicatorService: LoadingIndicatorService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Start the loading indicator
    this.loadingIndicatorService.start();

    // Return the original request
    return next.handle(req)
      // Stops the loading indicator when the HTTP call get cancelled, completes or throws an error
      .pipe(finalize(() => this.loadingIndicatorService.stop()));
  }

}
