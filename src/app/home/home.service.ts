import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { PhotoResponse } from '../../types/image.type'
import { Observable, Subject, map, switchMap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  data: any
  imagenUrl: any = ''
  imageBlob: any = ''
  photoData: Subject<PhotoResponse> = new Subject<PhotoResponse>()

  loadPhotoComponent(newPhoto: PhotoResponse) {
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

  processPhotoGoogle(image_url: any): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/v1/process-image/?image_url=${image_url}`, { responseType: 'blob' })
      .pipe(
        switchMap(async (response: Blob) => {
          // Procesar la imagen aquí
          const imageUrl = await this.processBlobImage(response)
          return imageUrl
        })
      )
  }
}
