import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModelFaceService } from './model-face.service';
import { ModelColorService } from '../model-color/model-color.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-model-face',
  standalone: true,
  imports: [],
  templateUrl: './model-face.component.html',
  styleUrl: './model-face.component.css'
})

export class ModelFaceComponent {
  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('videoPreview') videoPreview!: ElementRef;

  urlPrueba = 'https://www.ugr.es/~pjara/D/Docen14/TR/index.htm'
  urlServerResult: any = '';
  safeUrl: any = '';
  showVideo: boolean = false;
  private socket: WebSocket | undefined;

  constructor(private modelColorService: ModelColorService, public sanitizer: DomSanitizer) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlPrueba);
  }

  generateNumerRandom() {
    // Generar un número aleatorio entre 1 y 100
    const min = 1;
    const max = 100;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomInt;
  }

  async startCamera() {
    try {
      this.showVideo = true;
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement.nativeElement.srcObject = stream;
      this.setupWebSocket();
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }

  onSetupStreaming() {
    // Función para capturar y transmitir video continuamente
    if (this.showVideo) {
      const videoElement = this.videoElement.nativeElement;
      const captureAndStreamVideo = () => {
        const canvas = this.videoPreview.nativeElement;
        const context = canvas.getContext('2d');

        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;

        if (context !== null && context !== undefined) {
          context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          const imageData = canvas.toDataURL('image/jpeg');

          if (this.socket !== undefined) {
            if (this.socket.readyState === WebSocket.OPEN) {
              //Enviar al servidor
              this.socket.send(JSON.stringify({
                'message': 'Conexion establecida',
                'image_data': imageData,
                'type_model': 'mdf'
              }))
            }
          }
        }
      };

      // Ejecuta captureAndStreamVideo() cada 30 milisegundos
      setInterval(captureAndStreamVideo, 30);
    } else {
      console.log('Conexion cerrada');
      const a = document.createElement('a');
      a.href = document.location.href
      a.click()
    }
  }

  setupWebSocket() {
    // Establece la conexión WebSocket
    const numberRandom = this.generateNumerRandom()
    this.socket = new WebSocket(this.modelColorService.urlWebSocket.concat(numberRandom.toString(), '/'));
    this.urlServerResult = this.modelColorService.urlHttpWebSocket.concat(numberRandom.toString(), '/')
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlServerResult);
    // Evento que se ejecuta cuando la conexión se abre
    this.socket.onopen = () => {
      console.log('Conexión WebSocket establecida: ', numberRandom);
    };

    // Evento que se ejecuta cuando se cierra la conexión
    this.socket.onclose = () => {
      console.log('Conexión WebSocket cerrada');
      this.endCamera()
    };
    this.onSetupStreaming()
  }

  async endCamera() {
    const stream = this.videoElement.nativeElement.srcObject as MediaStream;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    this.videoElement.nativeElement.srcObject = null;
    this.showVideo = false;
    this.onSetupStreaming()
  }
}

