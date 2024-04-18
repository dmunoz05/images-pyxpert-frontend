import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { PhotoResponse } from '../../types/image.type'
import { Observable, Subject, map, switchMap } from 'rxjs'
import { MediaItems } from '../../types/list-photos.types'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  data: any
  imagenUrl: string = ''
  photoData: Subject<PhotoResponse> = new Subject<PhotoResponse>()
  imageSelected: any[] = []
  imageResponseProcess: any
  characteristicsResponseProcess: any[] = []

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
    return { baseUrl: imgUrl}
  }

  async processSearchContounr(imageBase64: string): Promise<Observable<any>> {
    const imageWithoutPrefix = imageBase64.split(';base64,')[1];
    const requestBody = { image: imageWithoutPrefix };
    return this.http.post(`${environment.api_django}/process-search-contourn-pc/`, requestBody, { responseType: 'blob' })
      .pipe(
        switchMap(async (response: Blob) => {
          const imageUrl = await this.processBlobImage(response)
          return imageUrl
        })
      )
  }

  processBWPhotoGoogle(image_url: any): Observable<any> {
    return this.http.get(`${environment.api_django}/process-black-white-image-google/?image_url=${image_url}`, { responseType: 'blob' })
      .pipe(
        switchMap(async (response: Blob) => {
          const imageUrl = await this.processBlobImage(response)
          return imageUrl
        })
      )
  }

  processBWPhotoPC(imageBase64: string): Observable<any> {
    const imageWithoutPrefix = imageBase64.split(';base64,')[1];
    const requestBody = { image: imageWithoutPrefix };

    return this.http.post(`${environment.api_django}/process-black-white-image-pc/`, requestBody, { responseType: 'blob' })
      .pipe(
        switchMap(async (response: Blob) => {
          const imageUrl = await this.processBlobImage(response)
          return imageUrl
        })
      )
  }

  getCharacteristicsPhotoPC(imageBase64: string): Observable<any> {
    const imageWithoutPrefix = imageBase64.split(';base64,')[1];
    const requestBody = { image: imageWithoutPrefix };
    return this.http.post(`${environment.api_django}/process-characteristic-image-pc/`, requestBody)
      .pipe(
        switchMap(async (response: any) => {
          return {characteristics: response.characteristics, image: imageBase64}
        })
      )
  }
}
