import { Component, OnInit, Output, Input, SimpleChanges, signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SlibarComponent } from '../slibar/slibar.component';
import { LoginService, UserInfo } from '../login/login.service';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PhotoResponse } from '../../types/image.type';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SlibarComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  showPhoto = signal<boolean>(false);
  dataPhoto = {} as PhotoResponse;
  userInfo?: any

  constructor(public loginService: LoginService, public http: HttpClient, private homeService: HomeService) { }

  ngOnInit() {
    //Obtener datos de usuario
    this.loginService.userProfileSubject.subscribe(info => {
      this.userInfo = info;
    })

    //Obtener foto seleccionada
    this.homeService.photoData.subscribe((photo) => {
      debugger
      this.showPhoto.set(true);
      this.dataPhoto = photo;
    });
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  ngOnChanges(changes: SimpleChanges) {
    debugger
    console.log(changes)
  }
}
