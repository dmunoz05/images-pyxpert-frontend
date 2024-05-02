import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  constructor(private http: HttpClient) { }

  firstFrame: boolean = false

  async processBlobImage(blob: Blob): Promise<string> {
    const reader = new FileReader()
    return new Promise<string>((resolve, reject) => {
      reader.onload = () => {
        const base64data = reader.result as string
        resolve(base64data)
      }

      reader.onerror = (error) => {
        reject(error)
      }
      reader.readAsDataURL(blob)
    })
  }

  async processAnyPhoto(blob: any): Promise<any> {
    const imgUrl = await this.processBlobImage(blob)
    return { baseUrl: imgUrl }
  }

  processDataImageQrPc(imageBase64: string): Observable<any> {
    this.firstFrame = true
    const imageWithoutPrefix = imageBase64.split(';base64,')[1];
    const requestBody = { image: imageWithoutPrefix };

    return this.http.post(`${environment.api_django}/process-image-qr-pc/`, requestBody, { responseType: 'blob' })
      .pipe(
        switchMap(async (response: any) => {
          const imageUrl = await this.processBlobImage(response)
          return imageUrl
        })
      )
  }

  convertImageToBase64(image: any) {
    return image.toDataURL();
  }

  generateQRCode() {

  }

}
