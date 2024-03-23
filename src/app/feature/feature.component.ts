import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { userInfo } from '../../types/user-info.type';
import { HomeService } from '../home/home.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.css'
})
export class FeatureComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  @Input() userInfo!: userInfo

  image: any;
  showImage = signal<boolean>(false)

  ngOnInit(): void {
    this.loadImageProcesed()
  }

  loadImageProcesed() {
    debugger
    this.image = this.homeService.imageResponseProcess
    if(this.image !== undefined) {
      this.showImage.set(true)
    }
  }

}
