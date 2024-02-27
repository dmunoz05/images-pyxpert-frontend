import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { SlibarComponent } from '../../slibar/slibar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService, UserInfo } from '../../login/login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ CommonModule, RouterModule, HeaderComponent, SlibarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
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
