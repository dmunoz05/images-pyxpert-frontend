import { Component, signal } from '@angular/core';
import { IaComponent } from '../../ia/ia.component';
import { CommonModule } from '@angular/common';
import { SlibarComponent } from '../../slibar/slibar.component';
import { LayoutHomeService } from '../layout-home/layout-home.service';

@Component({
  selector: 'app-layout-ia',
  standalone: true,
  imports: [CommonModule , IaComponent, SlibarComponent],
  templateUrl: './layout-ia.component.html',
  styleUrl: './layout-ia.component.css'
})
export class LayoutIaComponent {
  constructor(private layoutHomeService: LayoutHomeService) { }

  displaySliderBar = signal<any>(false)

  showSliderBar(value: any) {
    this.displaySliderBar.set(value)
    this.layoutHomeService.displaySliderBar.set(value)
  }
}
