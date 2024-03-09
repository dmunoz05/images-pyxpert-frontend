import { Component, OnInit, Output, Input, SimpleChanges, signal, EventEmitter, ElementRef, ViewChild } from '@angular/core'
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

  isDisplaySliderBar = signal<boolean>(false)
  showfunctionColor = signal<boolean>(false)
  showPhotoNew = signal<boolean>(false)
  showPhoto = signal<boolean>(false)
  dataPhoto: PhotoResponse[] = []
  newPhoto = signal([])
  userInfo = signal<any>('')
  basicChart: any
  imagenBase64: any
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  @Output() showSliderBarEvent = new EventEmitter<boolean>();

  ngOnInit() {
    //Obtener datos de usuario
    this.loginService.userProfileSubject.subscribe(info => {
      this.userInfo.set(info)
    })

    //Obtener foto seleccionada desde google
    this.homeService.photoData.subscribe((photo) => {
      debugger
      this.showPhoto.set(true)
      this.dataPhoto = [photo]
      this.displaySliderBar()
    })
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn()
  }

  showFunctionColor() {
    this.showfunctionColor.set(true)
  }

  displaySliderBar() {
    if (this.isDisplaySliderBar() === true) {
      this.isDisplaySliderBar.set(false)
      this.showSliderBarEvent.emit(false)
      return
    }
    this.isDisplaySliderBar.set(true)
    this.showSliderBarEvent.emit(true)
  }

  processImageSelected() {
    debugger
    let image: any = ''
    if (this.dataPhoto.length > 0) {
      image = this.dataPhoto[0].baseUrl
    }
    if (this.imagenBase64) {
      image = this.imagenBase64
    }
    this.homeService.processPhotoGoogle(image).subscribe((imgUrl) => {
      this.showPhotoNew.set(true)
      this.imagenBase64 = imgUrl
    })
  }

  openFileInput() {
    this.fileInput?.nativeElement.click();
  }

  onFileSelected(event: Event | null) {
    const inputElement = event?.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file: File = inputElement.files[0];
      this.homeService.processAnyPhoto(file).then((imgUrl: any) => {
        debugger
        this.showPhoto.set(true)
        this.dataPhoto = [imgUrl]
      })
    }
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
