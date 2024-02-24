import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    CommonModule,
    LoginComponent,
    HttpClientModule
  ],
  providers: [
    LoginService
  ]
})
export class AppModule { }
