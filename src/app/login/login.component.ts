import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { LoginService, UserInfo } from './login.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/begin/home'])
    }
  }

  login() {
    this.loginService.loginWithGoogle();
  }
}
