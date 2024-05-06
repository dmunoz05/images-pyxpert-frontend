import { Component, ViewChild, ElementRef, signal } from '@angular/core';
import { QrService } from './qr.service';

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [],
  templateUrl: './qr.component.html',
  styleUrl: './qr.component.css'
})
export class QrComponent {
  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('videoPreview') videoPreview!: ElementRef;

  loading = signal<boolean>(false)
  showImage: boolean = false;
  showVideo: boolean = false;
  intervalId: any = 0;
  dataPhoto: any = '';

  constructor(private qrService: QrService) {}

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
      setTimeout(() => {
        this.onCaptureStreaming();
      }, 3500)
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }

  onCaptureStreaming() {
    // Variable para almacenar el ID del intervalo
    const videoElement = this.videoElement.nativeElement;
    const canvas = this.videoPreview.nativeElement;
    const context = canvas.getContext('2d');

    // Función para capturar y transmitir video
    const captureAndStreamVideo = () => {
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      if (context !== null && context !== undefined) {
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');
        if (imageData !== "data:,") {
          clearInterval(this.intervalId);
          this.qrService.processDataImageQrPc(imageData).subscribe((imgUrl) => {
            if (imgUrl.includes("data:image/png;base64,")) {
              setTimeout(() => {
                this.endCamera();
                this.loading.set(false);
                this.showImage = true
                this.dataPhoto = imgUrl
              }, 1500)
            } else {
              this.loading.set(false);
              this.showImage = false
              alert(imgUrl)
              this.endCamera();
            }
          })
        }
      }
    };

    // Ejecutar captureAndStreamVideo() cada 30 milisegundos
    this.loading.set(true);
    this.intervalId = setInterval(captureAndStreamVideo, 30);
  }

  async endCamera() {
    if (this.videoElement !== undefined) {
      const stream = this.videoElement.nativeElement.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      this.videoElement.nativeElement.srcObject = null;
      this.showVideo = false;
    }
  }

}

