import { Component, OnInit, Output, signal, EventEmitter, ElementRef, ViewChild } from '@angular/core'
import { HeaderComponent } from '../header/header.component'
import { SlibarComponent } from '../slibar/slibar.component'
import { LoginService } from '../login/login.service'
import { HttpClient } from '@angular/common/http'
import { Router, RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common'
import { PhotoResponse } from '../../types/image.type'
import { HomeService } from './home.service'
import { LayoutHomeService } from '../layouts/layout-home/layout-home.service'
import { userInfo } from '../../types/user-info.type'
import { debug } from 'console'
// import { NgApexchartsModule } from "ng-apexcharts"

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
  showfunctionColor = signal<boolean>(false)
  showPhotoNew = signal<boolean>(false)
  showPhoto = signal<boolean>(false)
  dataPhoto: PhotoResponse[] = []
  newPhoto = signal([])
  userInfo = signal<userInfo>({} as userInfo)
  basicChart: any
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
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn()
  }

  getShapes(data: any) {

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

  // Función para convertir una imagen base64 a una URL
  async base64ToUrl(base64String: any) {
    debugger
    // Crea un nuevo objeto FileReader
    const reader = new FileReader()
    // Define la función de callback cuando se complete la lectura del archivo
    reader.onload = function (e) {
      debugger
      // La URL de la imagen será el resultado de la lectura
      const imageUrl = e.target?.result as string

      // Ahora puedes usar la URL de la imagen para mostrarla en tu aplicación
      // Por ejemplo, puedes asignarla al src de una etiqueta <img>
      // const imgElement = document.createElement('img')
      // imgElement.src = imageUrl
      // document.body.appendChild(imgElement) // Añade la imagen al body, puedes cambiar esto según tu necesidad
    }

    // Lee el contenido base64 como una URL
    reader.readAsDataURL(base64String)
  }

  async previewImage(file: any) {
    debugger

    const stream = new  MediaStream();

    file = stream.getTracks().forEach(track => {
      track.stop()
    })

    //Creamos la url
    const objectURL = file

    //Modificamos el atributo src de la etiqueta img
    const imgPreview = objectURL
    return imgPreview
  }

  processSynceGoogle(image: string) {
    this.homeService.processPhotoGoogle(image).subscribe((imgUrl) => {
      debugger
      this.homeService.imageResponseProcess = imgUrl
      this.router.navigate(['/begin/feature'])
    })
  }

  async processSynceMyPc(image: string) {
    // const urlImg = await this.previewImage(image)
    // console.log(urlImg)
    debugger
    const urlImg = image
    this.homeService.processPhotoPC(urlImg).subscribe((imgUrl) => {
      debugger
      this.homeService.imageResponseProcess = imgUrl
      this.router.navigate(['/begin/feature'])
    })
  }

  processImageSelected(data: any) {
    debugger
    this.homeService.imageSelected = data
    if (this.dataPhoto[0].baseUrl.startsWith("https")) {
      this.processSynceGoogle(data[0].baseUrl)
    }
    else {
      this.processSynceMyPc(data[0].baseUrl)
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

  //Grafica
  public chartOptions: any = {
    series: [
      {
        name: 'Sales',
        data: [35, 70, 125]
      }
    ],
    chart: {
      type: 'bar',
      height: 350
    },
    xaxis: {
      categories: [1991, 1992, 1993]
    },
    title: {
      text: 'Bar Chart',
      align: 'left'
    }
  }
}
