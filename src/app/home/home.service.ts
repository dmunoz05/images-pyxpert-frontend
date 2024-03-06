import { Injectable, Input, SimpleChanges } from '@angular/core';
import { LoginService } from '../login/login.service';
import { HttpClient } from '@angular/common/http';
import { PhotoResponse } from '../../types/image.type';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  photoData: Subject<PhotoResponse> = new Subject<PhotoResponse>();
  data: any;
  imagenUrl: any = '';

  constructor(private loginService: LoginService, private http: HttpClient) { }

  loadPhotoComponent(newPhoto: PhotoResponse) {
    this.data = newPhoto;
    this.photoData.next(this.data);
  }

  processPhoto(image_url: any): Observable<any> {
    debugger
    return this.http.get(`http://127.0.0.1:8000/api/v1/process-image/?image_url=${image_url}`, { responseType: 'blob' })
      .pipe(
        map(async (response: Blob) => {
          debugger
          // return response
          // Crear una URL local para la imagen recibida
          const reader = new FileReader();
          debugger
          reader.onloadend = () => {
            debugger
            this.imagenUrl = reader.result as string;
          }
          return reader.readAsDataURL(response);
        })
      )
    // .subscribe((response: Blob) => {
    //   // Crear una URL local para la imagen recibida
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     this.imagenUrl = reader.result as string;
    //   }
    //   return reader.readAsDataURL(response);
    // });
  }


}
