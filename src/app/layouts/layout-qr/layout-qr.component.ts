import { Component } from '@angular/core';
import { QrComponent } from '../../qr/qr.component';

@Component({
  selector: 'app-layout-qr',
  standalone: true,
  imports: [QrComponent],
  templateUrl: './layout-qr.component.html',
  styleUrl: './layout-qr.component.css'
})
export class LayoutQrComponent {

}
