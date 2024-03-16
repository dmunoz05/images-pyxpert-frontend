import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, Subject, catchError, map, switchMap, throwError } from 'rxjs'
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc'
import { environment } from '../../environments/environment'
import { userInfo } from '../../types/user-info.type'
import { listPhotos, MediaItems } from '../../types/list-photos.types'
import CryptoJS from 'crypto-js'
import { decrypt } from 'dotenv'

const oAuthConfig: AuthConfig = {
  issuer: environment.issuer,
  strictDiscoveryDocumentValidation: environment.strictDiscoveryDocumentValidation,
  redirectUri: environment.redirectUri,
  clientId: '',
  scope: environment.scope,
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private readonly apiUrlDrive = 'https://www.googleapis.com/drive/v3'

  private readonly apiUrlFotos = 'https://photoslibrary.googleapis.com/v1'

  btaClientId: string = environment.btoa_id
  userInfo: userInfo = {} as userInfo
  key: string = ''
  iv: string = ''
  userPhotos: MediaItems[] = []
  userFiles: any
  userProfileSubject = new Subject()

  constructor(private http: HttpClient, private oAuthService: OAuthService) {
    this.processECB(this.btaClientId)
  }

  async processECB(code: string) {
    const atobdec = atob(code)
    const value = await this.desencryptCrypto(atobdec)
    oAuthConfig.clientId = value
  }

  async desencryptCrypto(value: string) {
    const response = await this.getKeyApi(environment.bcrypt_id);
    const decrypted = CryptoJS.AES.decrypt(value, CryptoJS.enc.Utf8.parse(response.key), {
      keySize: 128 / 8,
      iv: CryptoJS.enc.Utf8.parse(response.iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return decrypted.toString(CryptoJS.enc.Utf8)
  }

  getKeyApi(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`http://127.0.0.1:8000/api/v1/key-vi/?key=${id}`).pipe(
        catchError((error: any) => {
          reject(error)
          return throwError(error)
        })
      ).subscribe((response: any) => {
        resolve(response.message);
      });
    });
  }

  loginWithGoogle() {
    if (typeof window !== 'undefined') {
      this.oAuthService.configure(oAuthConfig)
      this.oAuthService.loadDiscoveryDocument().then(() => {
        this.oAuthService.tryLoginImplicitFlow().then(() => {
          if (!this.oAuthService.hasValidAccessToken()) {
            this.oAuthService.initLoginFlow()
          } else {
            if (this.isLoggedIn()) {
              this.getUserInfo()
            }
          }
        })
      })
    }
  }

  async getUserInfo(): Promise<any> {
    const userProfile = await this.oAuthService.loadUserProfile().then((userProfile) => {
      this.userProfileSubject.next(userProfile as userInfo)
      return userProfile
    })
    return userProfile
  }

  listFiles(): Observable<any> {
    const url = `${this.apiUrlDrive}/files`
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.oAuthService.getAccessToken()}`)
    return this.http.get(url, { headers })
  }

  listPhotos(): Observable<any> {
    const url = `${this.apiUrlFotos}/mediaItems`
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.oAuthService.getAccessToken()}`)
    return this.http.get(url, { headers })
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken()
  }

  signOut() {
    this.oAuthService.logOut()
  }
}
