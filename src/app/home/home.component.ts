import { Component, OnInit, Output, signal, EventEmitter, ElementRef, ViewChild } from '@angular/core'
import { HeaderComponent } from '../header/header.component'
import { SlibarComponent } from '../slibar/slibar.component'
import { LoginService } from '../login/login.service'
import { Router, RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common'
import { PhotoResponse } from '../../types/image.type'
import { HomeService } from './home.service'
import { LayoutHomeService } from '../layouts/layout-home/layout-home.service'
import { userInfo } from '../../types/user-info.type'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SlibarComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService, private homeService: HomeService, private layoutHomeService: LayoutHomeService, private router: Router) { }

  userName: string | undefined = ''
  loading = signal<boolean>(false)
  showfunctionColor = signal<boolean>(false)
  showPhotoNew = signal<boolean>(false)
  showPhoto = signal<boolean>(false)
  dataPhoto: PhotoResponse[] = []
  newPhoto = signal([])
  userInfo = signal<userInfo>({} as userInfo)
  imagenBase64: any
  @ViewChild('fileInput') fileInput: ElementRef | undefined
  @Output() showSliderBarEvent = new EventEmitter<boolean>()

  ngOnInit() {
    //Obtener datos de usuario al inicio del home o cuando cambia de pagina
    if (Object.keys(this.loginService.userInfo).length == 0) {
      this.loginService.userProfileSubject.subscribe(info => {
        this.userInfo.set(info as userInfo)
        this.loginService.userInfo = info as userInfo
        this.userName = this.userInfo().info.name
      })
    } else {
      this.userInfo.set(this.loginService.userInfo)

      if (this.homeService.imageSelected.length > 0) {
        this.showPhoto.set(true)
        this.dataPhoto = this.homeService.imageSelected
      }
    }
    //Obtener foto seleccionada desde google
    this.homeService.photoData.subscribe((photo) => {
      this.showPhoto.set(true)
      this.dataPhoto = [photo]
      this.displaySliderBar()
    })

    this.showPhoto.set(false)
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn()
  }

  showFunctionColor(data: any) {
    this.homeService.imageSelected = data
    this.router.navigate(['/begin/feature'])
  }

  displaySliderBar() {
    if (this.layoutHomeService.displaySliderBar()) {
      this.showSliderBarEvent.emit(false)
      return
    }
    this.showSliderBarEvent.emit(true)
  }

  processBwSynceGoogle(image: string) {
    this.homeService.processBWPhotoGoogle(image).subscribe((imgUrl) => {
      this.loading.set(false)
      this.homeService.imageResponseProcess = imgUrl
      this.router.navigate(['/begin/feature'])
    })
  }

  processBwSynceMyPc(image: string) {
    this.homeService.processBWPhotoPC(image).subscribe((imgUrl) => {
      this.loading.set(false)
      this.homeService.imageResponseProcess = imgUrl
      this.router.navigate(['/begin/feature'])
    })
  }

  characteristicsSynceMyGoogle(image: string) {
    this.homeService.characteristicsResponseProcess = []
    this.homeService.getCharacteristicsPhotoGoogle(image).subscribe((result) => {
      this.loading.set(false)
      if(result.characteristics === undefined){
        alert("No se pudo obtener las caracteristicas de la imagen")
        return
      }
      this.homeService.imageResponseProcess = result.image
      this.homeService.characteristicsResponseProcess.push(result.characteristics)
      this.router.navigate(['/begin/feature'])
    })
  }

  characteristicsSynceMyPc(image: string) {
    this.homeService.characteristicsResponseProcess = []
    this.homeService.getCharacteristicsPhotoPC(image).subscribe((result) => {
      this.loading.set(false)
      if(result.characteristics === undefined){
        alert("No se pudo obtener las caracteristicas de la imagen")
        return
      }
      this.homeService.imageResponseProcess = result.image
      this.homeService.characteristicsResponseProcess.push(result.characteristics)
      this.router.navigate(['/begin/feature'])
    })
  }

  async searchContourns(data: any) {
    this.loading.set(true)
    this.homeService.imageSelected = data;
    if (this.dataPhoto[0].baseUrl.startsWith("https")) {
      (await this.homeService.processSearchContournGoogle(data[0].baseUrl)).subscribe((imgUrl) => {
        this.loading.set(false)
        this.homeService.imageResponseProcess = imgUrl
        this.router.navigate(['/begin/feature'])
      })
    }
    else {
      (await this.homeService.processSearchContournPC(data[0].baseUrl)).subscribe((imgUrl) => {
        this.loading.set(false)
        this.homeService.imageResponseProcess = imgUrl
        this.router.navigate(['/begin/feature'])
      })
    }

  }

  getCharacteristicImageSelected(data: any) {
    this.loading.set(true)
    this.homeService.imageSelected = data
    if (this.dataPhoto[0].baseUrl.startsWith("https")) {
      this.characteristicsSynceMyGoogle(data[0].baseUrl)
    }
    else {
      this.characteristicsSynceMyPc(data[0].baseUrl)
    }
  }

  processBwImageSelected(data: any) {
    this.loading.set(true)
    this.homeService.imageSelected = data
    if (this.dataPhoto[0].baseUrl.startsWith("https")) {
      this.processBwSynceGoogle(data[0].baseUrl)
    }
    else {
      this.processBwSynceMyPc(data[0].baseUrl)
    }
  }

  openFileInput() {
    this.fileInput?.nativeElement.click()
  }

  onFileSelected(event: Event | null) {
    const inputElement = event?.target as HTMLInputElement
    if (inputElement.files && inputElement.files.length > 0) {
      const file: File = inputElement.files[0]
      if (!file.type.includes('image')) {
        alert('Select only images of type jpg, png o svg')
        return
      }
      this.homeService.processAnyPhoto(file).then((imgUrl: any) => {
        this.showPhoto.set(true)
        this.dataPhoto = [imgUrl]
      })
    }
  }
}
