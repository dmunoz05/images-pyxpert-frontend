import { Component, EventEmitter, Input, OnChanges, OnInit } from '@angular/core';
import { LoginService, UserInfo } from '../login/login.service';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input() userInfo!: any

  constructor(private loginService: LoginService, private router: Router) { }

  logout() {
    this.loginService.signOut();
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }
}
