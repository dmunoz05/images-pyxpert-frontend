import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { SlibarComponent } from '../../slibar/slibar.component';
import { HomeComponent } from '../../home/home.component';
import { LayoutHomeService } from './layout-home.service';

@Component({
  selector: 'app-layout-home',
  standalone: true,
  imports: [CommonModule, SlibarComponent, HomeComponent],
  templateUrl: './layout-home.component.html',
  styleUrl: './layout-home.component.css'
})
export class LayoutHomeComponent {

  constructor(private layoutHomeService: LayoutHomeService) { }

  displaySliderBar = signal<any>(false)

  // showSliderBar(value: any) {
  //   this.displaySliderBar.set(value)
  // }

  showSliderBar(value: any) {
    this.displaySliderBar.set(value)
    this.layoutHomeService.displaySliderBar.set(value)
  }
}
