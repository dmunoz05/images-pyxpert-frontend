import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { PhotoResponse } from '../../types/image.type'
import { Observable, Subject, map, switchMap } from 'rxjs'
import { MediaItems } from '../../types/list-photos.types'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ModelPdcService {

  constructor(private http: HttpClient) { }

  data: any
  imagenUrl: string = ''
  photoData: Subject<PhotoResponse> = new Subject<PhotoResponse>()
  imageSelected: any[] = []
  imageResponseProcess: any;

  loadPhotoComponent(newPhoto: MediaItems) {
    this.data = newPhoto
    this.photoData.next(this.data)
  }

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

  processSearchPDC(imageBase64: string): Observable<any> {
    debugger
    const imageWithoutPrefix = imageBase64.split(';base64,')[1];
    const requestBody = { image: imageWithoutPrefix };

    return this.http.post(`${environment.api_django}/process-model-pdc-scan/`, requestBody)
      .pipe(
        switchMap(async (response: any) => {
          debugger
          return response.message
          const imageUrl = await this.processBlobImage(response)
          return imageUrl
        })
      );
  }

  // async processSearchPDC(imageBase64: string): Promise<Observable<any>> {
  //   const imageWithoutPrefix = imageBase64.split(';base64,')[1];
  //   const requestBody = { image: imageWithoutPrefix };
  //   return this.http.post(`${environment.api_django}/model-pdc-scan/`, requestBody, { responseType: 'blob' })
  //     .pipe(
  //       switchMap(async (response: Blob) => {
  //         const imageUrl = await this.processBlobImage(response)
  //         return imageUrl
  //       })
  //     );
  // }

  processPhotoPC(imageBase64: string): Observable<any> {
    const imageWithoutPrefix = imageBase64.split(';base64,')[1];
    const requestBody = { image: imageWithoutPrefix };

    return this.http.post(`${environment.api_django}/model-pdc-scan/`, requestBody, { responseType: 'blob' })
      .pipe(
        switchMap(async (response: Blob) => {
          const imageUrl = await this.processBlobImage(response)
          return imageUrl
        })
      );
  }
}
