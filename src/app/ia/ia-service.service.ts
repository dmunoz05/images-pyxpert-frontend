import { Injectable } from '@angular/core'
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai'
import { environment } from '../../environments/environment'
import { catchError, throwError } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import CryptoJS from 'crypto-js'

@Injectable({
  providedIn: 'root'
})
export class IaServiceService {

  API_KEY: string = ''
  btoaApiKey: string = environment.bto_id_ia
  gentAi = new GoogleGenerativeAI('')

  constructor(private http: HttpClient) {}

  async processECB(code: string) {
    const atobdec = atob(code)
    const value = await this.desencryptCrypto(atobdec)
    this.gentAi = new GoogleGenerativeAI(value)
    return value
  }

  async desencryptCrypto(value: string) {
    const response = await this.getKeyApi(environment.crypt_id_ia)
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
      this.http.get(`${environment.api_django}/api/v1/key-vi-ia/?key=${id}`).pipe(
        catchError((error: any) => {
          reject(error)
          return throwError(error)
        })
      ).subscribe((response: any) => {
        resolve(response.message)
      })
    })
  }

  createModelImages() {
    return this.gentAi.getGenerativeModel({
      model: 'gemini-pro-vision',
      generationConfig: {
        maxOutputTokens: 4096
      }
    })
  }

  createModelChat() {
    return this.gentAi.getGenerativeModel({
      model: 'gemini-pro',
      generationConfig: {
        maxOutputTokens: 4096
      }
    })
  }
}
