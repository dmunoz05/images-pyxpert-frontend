import { Component, OnInit, signal } from '@angular/core'
import { HeaderComponent } from '../header/header.component'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { LoginService } from '../login/login.service'
import { userInfo } from '../../types/user-info.type'
import { listPhotos } from '../../types/list-photos.types'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  userInfo: userInfo = { } as userInfo;
  userPicture: string = ""

  ngOnInit() {
    //Obtener datos de usuario
    this.loginService.loginWithGoogle()
    this.loginService.userProfileSubject.subscribe(info => {
      debugger
      //Actualizar estado global del service con el usuario
      this.userInfo = info as userInfo
      this.loginService.userInfo = info as userInfo
      this.userPicture = this.userInfo.info.picture

      //Obtener datos de drive y añadirlas
      this.loginService.listFiles().subscribe(data => {
        const filesJpg = data.files.filter((file: { name: string }) => file.name.endsWith('.jpg'))
        this.loginService.userFiles = filesJpg
      })

      //Obtener fotos de google fotos y añadirlas
      this.loginService.listPhotos().subscribe(data => {
        //Buscar solo mimtype jpg
        const filesJpg = data.mediaItems.filter((file: { mimeType: string }) => file.mimeType == "image/jpeg")
        this.loginService.userPhotos = filesJpg
      })
    })
  }
}
