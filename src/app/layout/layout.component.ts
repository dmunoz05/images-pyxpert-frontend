import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SlibarComponent } from '../slibar/slibar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService, UserInfo } from '../login/login.service';
import { HttpClient } from '@angular/common/http';
import { PhotoResponse } from '../../types/image.type';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SlibarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  userInfo?: any
  userFiles?: any
  userPhotos?: any
  photoData = {} as PhotoResponse;

  constructor(public loginService: LoginService, public http: HttpClient) { }

  ngOnInit() {
    //Obtener datos de usuario
    this.loginService.loginWithGoogle()

    this.loginService.userProfileSubject.subscribe(info => {
      this.userInfo = info;
      this.loginService.listFiles().subscribe(data => {
        const filesJpg = data.files.filter((file: { name: string; }) => file.name.endsWith('.jpg'));
        this.userFiles = filesJpg;
      })
      //Traer fotos de google fotos y añadirlas
      this.loginService.listPhotos().subscribe(data => {
        //Buscar solo mimtype jpg
        const filesJpg = data.mediaItems.filter((file: { mimeType: string; }) => file.mimeType == "image/jpeg");
        this.userPhotos = filesJpg;
      })
    })

  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }
}
