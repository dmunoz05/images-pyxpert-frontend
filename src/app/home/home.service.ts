import { Injectable, Input, SimpleChanges } from '@angular/core';
import { LoginService } from '../login/login.service';
import { HttpClient } from '@angular/common/http';
import { PhotoResponse } from '../../types/image.type';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  photoData: Subject<PhotoResponse> = new Subject<PhotoResponse>();
  data: any;

  constructor(private loginService: LoginService, private http: HttpClient) {}

  loadPhotoComponent(newPhoto: PhotoResponse) {
    this.data = newPhoto;
    this.photoData.next(this.data);
  }
}
