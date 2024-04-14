import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModelPdcComponent } from '../../model-pdc/model-pdc.component';

@Component({
  selector: 'app-layout-model-pdc',
  standalone: true,
  imports: [CommonModule, ModelPdcComponent],
  templateUrl: './layout-model-pdc.component.html',
  styleUrl: './layout-model-pdc.component.css'
})
export class LayoutModelPdcComponent {

}
