import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment.development';

const oAuthConfig: AuthConfig = {
  issuer: environment.issuer,
  strictDiscoveryDocumentValidation: environment.strictDiscoveryDocumentValidation,
  redirectUri: environment.redirectUri,
  clientId: environment.clientId,
  scope: environment.scope,
}

export interface UserInfo {
  info: {
    sub: string,
    email: string,
    name: string,
    picture: string,
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrlDrive = 'https://www.googleapis.com/drive/v3';

  private readonly apiUrlFotos = 'https://photoslibrary.googleapis.com/v1';

  constructor(private http: HttpClient, private oAuthService: OAuthService) {}

  userInfo = signal<any>({})
  userPhotos = signal<any>({})
  userFiles = signal<any>({})
  userProfileSubject = new Subject()

  loginWithGoogle() {
    if (typeof window !== 'undefined') {
      this.oAuthService.configure(oAuthConfig);
      this.oAuthService.loadDiscoveryDocument().then(() => {
        this.oAuthService.tryLoginImplicitFlow().then(() => {
          if (!this.oAuthService.hasValidAccessToken()) {
            this.oAuthService.initLoginFlow();
          } else {
            this.oAuthService.loadUserProfile().then((userProfile) => {
              this.userInfo.set(userProfile as UserInfo)
              this.userProfileSubject.next(userProfile as UserInfo);
            })
          }
        })
      })
    }
  }

  getUserInfo(): Observable<string> {
    return this.userInfo();
  }

  listFiles(): Observable<any> {
    const url = `${this.apiUrlDrive}/files`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.oAuthService.getAccessToken()}`);
    return this.http.get(url, { headers });
  }

  listPhotos(): Observable<any> {
    const url = `${this.apiUrlFotos}/mediaItems`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.oAuthService.getAccessToken()}`);
    return this.http.get(url, { headers });
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  signOut() {
    this.oAuthService.logOut();
  }
}
