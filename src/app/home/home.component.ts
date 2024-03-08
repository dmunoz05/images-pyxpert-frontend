import { Component, OnInit, Output, Input, SimpleChanges, signal, EventEmitter } from '@angular/core'
import { HeaderComponent } from '../header/header.component'
import { SlibarComponent } from '../slibar/slibar.component'
import { LoginService, UserInfo } from '../login/login.service'
import { HttpClient } from '@angular/common/http'
import { RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common'
import { PhotoResponse } from '../../types/image.type'
import { HomeService } from './home.service'
import { NgApexchartsModule } from "ng-apexcharts"
import { LayoutService } from '../layouts/layout.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SlibarComponent, RouterLink, NgApexchartsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService, private http: HttpClient, private homeService: HomeService, private layoutService: LayoutService) { }

  showfunctionColor = signal<boolean>(false)
  showPhotoNew = signal<boolean>(false)
  showPhoto = signal<boolean>(false)
  dataPhoto = {} as PhotoResponse
  newPhoto = signal([])
  userInfo?: any
  basicChart: any
  imagenBase64: any
  isDisplaySliderBar = signal<boolean>(false)

  @Output() showSliderBarEvent = new EventEmitter<boolean>();

  ngOnInit() {
    //Obtener datos de usuario
    this.loginService.userProfileSubject.subscribe(info => {
      this.userInfo = info
    })

    //Obtener foto seleccionada
    this.homeService.photoData.subscribe((photo) => {
      this.showPhoto.set(true)
      this.dataPhoto = photo
    })
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn()
  }

  showFunctionColor() {
    this.showfunctionColor.set(true)
  }

  displaySliderBarTrue(){
    this.isDisplaySliderBar.set(true)
    this.showSliderBarEvent.emit(true)
  }

  displaySliderBarFalse(){
    this.isDisplaySliderBar.set(false)
    this.showSliderBarEvent.emit(false)
  }

  processImage(image_url: any) {
    this.homeService.processPhoto(image_url).subscribe((imgUrl) => {
      this.newPhoto.set(imgUrl)
      this.showPhotoNew.set(true)
      this.imagenBase64 = imgUrl
    })
  }

  //Grafica
  public chartOptions: any = {
    series: [
      {
        name: 'Sales',
        data: [35, 70, 125]
      }
    ],
    chart: {
      type: 'bar',
      height: 350
    },
    xaxis: {
      categories: [1991, 1992, 1993]
    },
    title: {
      text: 'Bar Chart',
      align: 'left'
    }
  }
}
