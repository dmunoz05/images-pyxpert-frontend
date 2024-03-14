import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { userInfo } from '../../types/user-info.type';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule],
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
    this.showImage.set(true)
    this.image = this.homeService.imageResponseProcess
  }

}
