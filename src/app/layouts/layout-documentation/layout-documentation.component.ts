import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DocumentationComponent } from '../../documentation/documentation.component';

@Component({
  selector: 'app-layout-documentation',
  standalone: true,
  imports: [CommonModule, DocumentationComponent],
  templateUrl: './layout-documentation.component.html',
  styleUrl: './layout-documentation.component.css'
})
export class LayoutDocumentationComponent {

}
