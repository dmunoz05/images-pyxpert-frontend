import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { userInfo } from '../../types/user-info.type';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.css'
})
export class FeatureComponent {
  @Input() userInfo!: userInfo
}
