import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModelColorComponent } from '../../model-color/model-color.component';

@Component({
  selector: 'app-layout-model-color',
  standalone: true,
  imports: [CommonModule, ModelColorComponent],
  templateUrl: './layout-model-color.component.html',
  styleUrl: './layout-model-color.component.css'
})
export class LayoutModelColorComponent {

}
