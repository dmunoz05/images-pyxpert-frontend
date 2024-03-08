import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { HeaderComponent } from '../../header/header.component';
import { SlibarComponent } from '../../slibar/slibar.component';
import { HomeComponent } from '../../home/home.component';
import { LoginService } from '../../login/login.service';
import { HttpClient } from '@angular/common/http';
import { LayoutService } from '../layout.service';
import { PhotoResponse } from '../../../types/image.type';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout-home',
  standalone: true,
  imports: [CommonModule, SlibarComponent, HomeComponent],
  templateUrl: './layout-home.component.html',
  styleUrl: './layout-home.component.css'
})
export class LayoutHomeComponent {

  constructor(private loginService: LoginService, private http: HttpClient, private layoutService: LayoutService) { }

  displaySliderBar = signal<any>(false)

  showSliderBar(value: any) {
    this.displaySliderBar.set(value)
  }
}
