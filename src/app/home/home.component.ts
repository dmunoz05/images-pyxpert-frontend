import { Component, OnInit, Output, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SlibarComponent } from '../slibar/slibar.component';
import { LoginService, UserInfo } from '../login/login.service';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SlibarComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  userInfo?: any

  constructor(public loginService: LoginService, public http: HttpClient) { }

  ngOnInit() {
    //Obtener datos de usuario
    this.loginService.loginWithGoogle()

    this.loginService.userProfileSubject.subscribe(info => {
      this.userInfo = info;
    })
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }
}
