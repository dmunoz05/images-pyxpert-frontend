import { Injectable, Input, SimpleChanges } from '@angular/core'
import { LoginService } from '../login/login.service'
import { HttpClient } from '@angular/common/http'
import { PhotoResponse } from '../../types/image.type'
import { Observable, Subject, map, switchMap } from 'rxjs'
import { debug } from 'node:console'

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  photoData: Subject<PhotoResponse> = new Subject<PhotoResponse>()
  data: any
  imagenUrl: any = ''
  imageBlob: any = ''

  constructor(private loginService: LoginService, private http: HttpClient) { }

  loadPhotoComponent(newPhoto: PhotoResponse) {
    this.data = newPhoto
    this.photoData.next(this.data)
  }

  async processBlob(blob: Blob): Promise<string> {
    const reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
      reader.onload = () => {
        const base64data = reader.result as string;
        resolve(base64data);
      };

      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  }

  processPhoto(image_url: any): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/v1/process-image/?image_url=${image_url}`, { responseType: 'blob' })
      .pipe(
        switchMap(async (response: Blob) => {
          // Procesar la imagen aquí
          const imageUrl = await this.processBlob(response);
          return imageUrl;
        })
      );
  }


}
