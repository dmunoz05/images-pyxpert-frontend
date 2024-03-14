import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { PhotoResponse } from '../../types/image.type';
import { HomeService } from '../home/home.service';
import { LoginService } from '../login/login.service';
import { LayoutHomeService } from '../layouts/layout-home/layout-home.service';
import { MediaItems } from '../../types/list-photos.types';

@Component({
  selector: 'app-slibar',
  standalone: true,
  imports: [],
  templateUrl: './slibar.component.html',
  styleUrl: './slibar.component.css'
})
export class SlibarComponent implements OnInit {

  constructor(private homeService: HomeService, private loginService: LoginService, private layoutHomeService: LayoutHomeService) { }

  isDisplaySliderBar = signal<boolean>(false)
  @Output() showSliderBarEvent = new EventEmitter<boolean>();

  userPhotos = signal<MediaItems[]>([]);

  ngOnInit() {
    this.userPhotos.set(this.loginService.userPhotos);
  }

  displaySliderBar() {
    if (this.layoutHomeService.displaySliderBar() === true) {
      this.isDisplaySliderBar.set(false)
      this.showSliderBarEvent.emit(false)
      return
    }
    this.isDisplaySliderBar.set(true)
    this.showSliderBarEvent.emit(true)
  }

  linkImage(image: string, event: Event) {
    event.stopPropagation();
    if (typeof window !== 'undefined') {
      window.open(image, '_blank');
    }
    return false;
  }

  loadImageSelect(photo: MediaItems) {
    this.homeService.loadPhotoComponent(photo)
  }
}
