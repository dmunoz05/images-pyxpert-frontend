import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutHomeService {

  constructor() { }

  displaySliderBar = signal<any>(false)

  showSliderBar(value: any) {
    this.displaySliderBar.set(value)
  }
}
