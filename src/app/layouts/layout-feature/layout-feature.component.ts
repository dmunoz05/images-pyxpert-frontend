import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { SlibarComponent } from '../../slibar/slibar.component';
import { FeatureComponent } from '../../feature/feature.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout-feature',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SlibarComponent, FeatureComponent],
  templateUrl: './layout-feature.component.html',
  styleUrl: './layout-feature.component.css'
})
export class LayoutFeatureComponent {
  constructor() { }

  displaySliderBar = signal<any>(false)
}
