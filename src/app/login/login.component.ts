import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { CommonModule } from '@angular/common';
import { AuthConfig, OAuthService, UserInfo } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment.development';

const oAuthConfig: AuthConfig = {
  issuer: environment.issuer,
  strictDiscoveryDocumentValidation: environment.strictDiscoveryDocumentValidation,
  redirectUri: environment.redirectUri,
  clientId: environment.clientId,
  scope: environment.scope,
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private oAuthService: OAuthService) {}

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/begin/home'])
    }
  }

  login() {
    this.loginService.loginWithGoogle();
  }
}
