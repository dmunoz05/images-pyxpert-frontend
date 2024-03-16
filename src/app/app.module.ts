import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login/login.component'
import { LoginService } from './login/login.service'
import { HttpClientModule } from "@angular/common/http"
import { OAuthModule } from 'angular-oauth2-oidc'

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    CommonModule,
    LoginComponent,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [
    LoginService
  ]
})
export class AppModule { }
