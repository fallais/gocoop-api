import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { JWTInterceptor} from './interceptor/http.interceptor';
import { AuthGuard } from './auth.guard';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/misc/login/login.component';
import { DashboardComponent } from './components/misc/dashboard/dashboard.component';
import { NavComponent } from './components/misc/nav/nav.component';

// Services
import { AuthService } from './services/auth.service';
import { CoopService } from './services/coop.service';

// Vendor
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from "@auth0/angular-jwt";
import { SimpleNotificationsModule } from 'angular2-notifications';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    LoadingBarModule,
    SimpleNotificationsModule.forRoot({
      preventDuplicates: true,
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost", "localhost:4200"]
      }
    })
  ],
  providers: [
    Title,
    AuthGuard,
    CoopService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }