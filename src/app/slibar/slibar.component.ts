import { Component, Input, Output } from '@angular/core';
import { PhotoResponse } from '../../types/image.type';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-slibar',
  standalone: true,
  imports: [],
  templateUrl: './slibar.component.html',
  styleUrl: './slibar.component.css'
})
export class SlibarComponent {

  constructor (private homeService: HomeService) {}

  @Input() userPhotos!: any;

  linkImage(image: string, event: Event) {
    event.stopPropagation();
    // window.open(image, '_blank');
    return false;
  }

  loadImageSelect(photo: PhotoResponse) {
    this.homeService.loadPhotoComponent(photo)
  }
}
