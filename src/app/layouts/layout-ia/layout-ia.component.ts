import { Component } from '@angular/core';
import { IaComponent } from '../../ia/ia.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout-ia',
  standalone: true,
  imports: [CommonModule , IaComponent],
  templateUrl: './layout-ia.component.html',
  styleUrl: './layout-ia.component.css'
})
export class LayoutIaComponent {

}
