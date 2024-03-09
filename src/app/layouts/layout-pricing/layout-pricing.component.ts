import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PricingComponent } from '../../pricing/pricing.component';

@Component({
  selector: 'app-layout-pricing',
  standalone: true,
  imports: [CommonModule, PricingComponent],
  templateUrl: './layout-pricing.component.html',
  styleUrl: './layout-pricing.component.css'
})
export class LayoutPricingComponent {

}
