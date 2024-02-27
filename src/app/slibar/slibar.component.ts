import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slibar',
  standalone: true,
  imports: [],
  templateUrl: './slibar.component.html',
  styleUrl: './slibar.component.css'
})
export class SlibarComponent {

  @Input() userPhotos!: any;
}
