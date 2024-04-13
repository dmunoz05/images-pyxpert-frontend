import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CameraComponent } from '../../camera/camera.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-layout-model-face',
  standalone: true,
  imports: [CommonModule, CameraComponent],
  templateUrl: './layout-model-face.component.html',
  styleUrl: './layout-model-face.component.css'
})
export class LayoutModelFaceComponent {

}
