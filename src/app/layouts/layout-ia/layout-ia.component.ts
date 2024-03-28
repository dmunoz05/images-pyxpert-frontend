import { Component, OnInit, signal } from '@angular/core';
import { IaComponent } from '../../ia/ia.component';
import { CommonModule } from '@angular/common';
import { SlibarComponent } from '../../slibar/slibar.component';
import { LayoutHomeService } from '../layout-home/layout-home.service';
import { userInfo } from '../../../types/user-info.type';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-layout-ia',
  standalone: true,
  imports: [CommonModule , IaComponent, SlibarComponent],
  templateUrl: './layout-ia.component.html',
  styleUrl: './layout-ia.component.css'
})
export class LayoutIaComponent implements OnInit {
  constructor(private layoutHomeService: LayoutHomeService, private loginService: LoginService) { }

  userPicture: string = ""

  ngOnInit() {
    //Obtener datos de usuario
    this.userPicture = this.loginService.userInfo.info?.picture
  }

  displaySliderBar = signal<any>(false)

  showSliderBar(value: any) {
    this.displaySliderBar.set(value)
    this.layoutHomeService.displaySliderBar.set(value)
  }
}
