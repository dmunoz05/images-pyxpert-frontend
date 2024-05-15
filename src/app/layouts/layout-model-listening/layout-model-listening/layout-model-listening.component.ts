import { Component } from '@angular/core';
import { ModelListeningComponent } from '../../../model-listening/model-listening.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout-model-listening',
  standalone: true,
  imports: [CommonModule, ModelListeningComponent],
  templateUrl: './layout-model-listening.component.html',
  styleUrl: './layout-model-listening.component.css'
})
export class LayoutModelListeningComponent {

}
