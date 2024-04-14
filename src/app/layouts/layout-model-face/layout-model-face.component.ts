import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModelFaceComponent } from '../../model-face/model-face.component';

@Component({
  selector: 'app-layout-model-face',
  standalone: true,
  imports: [CommonModule, ModelFaceComponent],
  templateUrl: './layout-model-face.component.html',
  styleUrl: './layout-model-face.component.css'
})
export class LayoutModelFaceComponent {

}
