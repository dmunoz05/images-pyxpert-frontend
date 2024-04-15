import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { HomeService } from '../home/home.service';
import { ModelPdcService } from './model-pdc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-model-pdc',
  standalone: true,
  imports: [],
  templateUrl: './model-pdc.component.html',
  styleUrl: './model-pdc.component.css'
})
export class ModelPdcComponent {

  constructor(private modelPdcService: ModelPdcService, private router: Router) { }
  @ViewChild('fileInput') fileInput: ElementRef | undefined
  showPhotoNew = signal<boolean>(false)
  showResult = signal<boolean>(false)
  showPhoto = signal<boolean>(false)
  dataPhoto: any[] = []

  onFileSelected(event: Event | null) {
    const inputElement = event?.target as HTMLInputElement
    if (inputElement.files && inputElement.files.length > 0) {
      const file: File = inputElement.files[0]
      if (!file.type.includes('image')) {
        alert('Select only images of type jpg, png o svg')
        return
      }
      this.modelPdcService.processAnyPhoto(file).then((imgUrl: any) => {
        this.showPhoto.set(true)
        this.dataPhoto = [imgUrl]
      })
    }
  }

  openFileInput() {
    this.fileInput?.nativeElement.click()
  }

  processPhotoModelPDC(image: string) {
    this.modelPdcService.processSearchPDC(image).subscribe((message: any) => {
      console.log(message);
      alert(message)
      // this.modelPdcService.imageResponseProcess = imgUrl
      // this.router.navigate(['/begin/feature'])
    })

  }
}

