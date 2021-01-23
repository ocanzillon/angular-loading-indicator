import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoadingIndicatorComponent } from './component/loading-indicator/loading-indicator.component';
import { UserComponent } from './component/user/user.component';
import { DelayInterceptor } from './interceptor/delay-interceptor.service';
import { LoadingIndicatorInterceptor } from './interceptor/loading-indicator-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoadingIndicatorComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingIndicatorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DelayInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
