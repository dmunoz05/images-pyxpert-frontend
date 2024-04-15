import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModelColorService } from './model-color.service';

@Component({
  selector: 'app-model-color',
  standalone: true,
  imports: [],
  templateUrl: './model-color.component.html',
  styleUrl: './model-color.component.css'
})
export class ModelColorComponent {
  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('videoPreview') videoPreview!: ElementRef;

  showVideo: boolean = false;
  private socket: WebSocket | undefined;

  constructor(private modelColorService: ModelColorService) { }

  verVideo(video: any, context: any, canvas: any) {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    if (this.socket !== undefined) {
      this.socket.send(canvas.toDataURL('image/png'));
    }
  }

  otherFunction() {
    this.modelColorService.contentVideoStreaming().subscribe(data => {
      console.log("Mensaje del servidor", data)
    }, error => {
      console.log("Error de conexion", error)
    })
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

        if (context !== null) {
          context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          const imageData = canvas.toDataURL('image/jpeg');

          if (this.socket !== undefined) {
            if (this.socket.readyState === WebSocket.OPEN) {
              //Enviar al servidor
              this.socket.send(JSON.stringify({
                'message': 'Conexion establecida',
                'image_data': imageData
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
    this.socket = new WebSocket(this.modelColorService.urlWebSocket);

    // Evento que se ejecuta cuando la conexión se abre
    this.socket.onopen = () => {
      // console.log('Conexión WebSocket establecida');
    };

    // Evento que se ejecuta cuando se cierra la conexión
    this.socket.onclose = () => {
      // console.log('Conexión WebSocket cerrada');
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

