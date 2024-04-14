import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-model-face',
  standalone: true,
  imports: [],
  templateUrl: './model-face.component.html',
  styleUrl: './model-face.component.css'
})

export class ModelFaceComponent {
  @ViewChild('videoElement') videoElement!: ElementRef;
  showVideo: boolean = false;

  async startCamera() {
    try {
      this.showVideo = true;
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement.nativeElement.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }

  async endCamera(){
    const stream = this.videoElement.nativeElement.srcObject as MediaStream;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    this.videoElement.nativeElement.srcObject = null;
    this.showVideo = false;
  }
}

