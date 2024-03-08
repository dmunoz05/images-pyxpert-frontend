import { Component, Input, OnInit, Output, signal } from '@angular/core';
import { PhotoResponse } from '../../types/image.type';
import { HomeService } from '../home/home.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-slibar',
  standalone: true,
  imports: [],
  templateUrl: './slibar.component.html',
  styleUrl: './slibar.component.css'
})
export class SlibarComponent implements OnInit {

  constructor(private homeService: HomeService, private loginService: LoginService) { }

  userPhotos = signal<any>([]);

  ngOnInit() {
    this.userPhotos.set(this.loginService.userPhotos());
  }

  linkImage(image: string, event: Event) {
    event.stopPropagation();
    window.open(image, '_blank');
    return false;
  }

  loadImageSelect(photo: PhotoResponse) {
    this.homeService.loadPhotoComponent(photo)
  }
}
