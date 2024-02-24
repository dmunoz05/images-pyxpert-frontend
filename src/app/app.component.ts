import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SocialAuthService, SocialAuthServiceConfig } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'app-images-python';
  // user!: SocialUser;
  // loggedIn!: boolean;

  // constructor(private authService: SocialAuthServiceConfig) { }

  ngOnInit(): void {
    // this.authService.authState.subscribe(user => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    // });
  }

  // ngOnDestroy(): void {
  //   this.authService.authState.unsubscribe();
  // }

  // refreshToken(): void {
  //   this.authService.refreshAccessToken(GoogleLoginProvider.PROVIDER_ID);
  // }

  signInWithGoogle(): void {
    debugger;
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    //   .then(user => {
    //     this.user = user;
    //     this.loggedIn = (user != null);
    //   })
    //   .catch(error => {
    //     console.error('Error al iniciar sesión con Google:', error);
    //   });
  }

  // signOut(): void {
  //   this.authService.signOut();
  // }

}
