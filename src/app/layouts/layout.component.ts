import { Component, OnChanges, OnInit, SimpleChange, SimpleChanges, WritableSignal, signal } from '@angular/core'
import { HeaderComponent } from '../header/header.component'
import { SlibarComponent } from '../slibar/slibar.component'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { LoginService, UserInfo } from '../login/login.service'
import { HttpClient } from '@angular/common/http'
import { PhotoResponse } from '../../types/image.type'
import { LayoutService } from './layout.service'
import { blob } from 'stream/consumers'
import { HomeComponent } from '../home/home.component'
import { FeatureComponent } from '../feature/feature.component'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SlibarComponent, HomeComponent, FeatureComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  constructor(private loginService: LoginService, private http: HttpClient, private layoutService: LayoutService) { }

  userInfo?: any
  userFiles?: any
  userPhotos?: any
  photoData = {} as PhotoResponse
  displaySliderBar = signal<any>(false)

  ngOnInit() {
    //Obtener datos de usuario
    this.loginService.loginWithGoogle()

    this.loginService.userProfileSubject.subscribe(info => {
      this.userInfo = info
      this.loginService.listFiles().subscribe(data => {
        const filesJpg = data.files.filter((file: { name: string }) => file.name.endsWith('.jpg'))
        this.userFiles = filesJpg
      })
      //Traer fotos de google fotos y añadirlas
      this.loginService.listPhotos().subscribe(data => {
        //Buscar solo mimtype jpg
        const filesJpg = data.mediaItems.filter((file: { mimeType: string }) => file.mimeType == "image/jpeg")
        this.userPhotos = filesJpg
      })
    })
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn()
  }

  showSliderBar(value: any) {
    debugger
    this.displaySliderBar.set(value)
  }
}
