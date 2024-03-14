import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment.development';
import { userInfo } from '../../types/user-info.type';

const oAuthConfig: AuthConfig = {
  issuer: environment.issuer,
  strictDiscoveryDocumentValidation: environment.strictDiscoveryDocumentValidation,
  redirectUri: environment.redirectUri,
  clientId: environment.clientId,
  scope: environment.scope,
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrlDrive = 'https://www.googleapis.com/drive/v3';

  private readonly apiUrlFotos = 'https://photoslibrary.googleapis.com/v1';

  constructor(private http: HttpClient, private oAuthService: OAuthService) { }

  userInfo: userInfo = { } as userInfo
  userPhotos: any
  userFiles: any
  userProfileSubject = new Subject()

  loginWithGoogle() {
    if (typeof window !== 'undefined') {
      this.oAuthService.configure(oAuthConfig);
      this.oAuthService.loadDiscoveryDocument().then(() => {
        this.oAuthService.tryLoginImplicitFlow().then(() => {
          if (!this.oAuthService.hasValidAccessToken()) {
            this.oAuthService.initLoginFlow();
          } else {
            if (this.isLoggedIn()) {
              this.getUserInfo()
            }
          }
        })
      })
    }
  }

  async getUserInfo(): Promise<any>{
    const userProfile = await this.oAuthService.loadUserProfile().then((userProfile) => {
      this.userProfileSubject.next(userProfile as userInfo);
      return userProfile;
    })
    return userProfile
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
