import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { SlibarComponent } from '../../slibar/slibar.component';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-layout-home',
  standalone: true,
  imports: [CommonModule, SlibarComponent, HomeComponent],
  templateUrl: './layout-home.component.html',
  styleUrl: './layout-home.component.css'
})
export class LayoutHomeComponent {

  displaySliderBar = signal<any>(false)

  showSliderBar(value: any) {
    this.displaySliderBar.set(value)
  }
}
