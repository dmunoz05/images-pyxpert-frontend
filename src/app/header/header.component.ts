import { Component, Input } from '@angular/core';
import { LoginService } from '../login/login.service';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { userInfo } from '../../types/user-info.type';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private loginService: LoginService, private router: Router) { }

  @Input() userPicture: string | undefined

  logout() {
    this.loginService.signOut();
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }
}
