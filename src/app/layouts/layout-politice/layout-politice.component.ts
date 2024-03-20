import { Component } from '@angular/core';
import { PoliticeComponent } from '../../politice/politice.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout-politice',
  standalone: true,
  imports: [CommonModule, PoliticeComponent],
  templateUrl: './layout-politice.component.html',
  styleUrl: './layout-politice.component.css'
})
export class LayoutPoliticeComponent {

}
