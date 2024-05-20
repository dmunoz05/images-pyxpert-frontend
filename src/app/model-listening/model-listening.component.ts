import { Component, ViewChild, ElementRef, signal } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { ModelListeningService } from './model-listening.service';

@Component({
  selector: 'app-model-listening',
  standalone: true,
  imports: [],
  templateUrl: './model-listening.component.html',
  styleUrl: './model-listening.component.css'
})
export class ModelListeningComponent {
  @ViewChild('waveform', { static: false }) waveformEl!: ElementRef;
  loading = signal<boolean>(false)
  blobAudio!: Blob;
  isRecording: boolean = false;
  listening: boolean = false;
  isPlaying: boolean = false;
  showButtons: boolean = false;
  private mediaRecorder!: MediaRecorder;
  private waveSurfer!: WaveSurfer;
  private stream!: MediaStream;
  private chunks: any[] = [];

  constructor(private listeningService: ModelListeningService) { }

  events() {
    this.waveSurfer.once('interaction', () => {
      this.waveSurfer.play();
      this.isPlaying = false;
    })

    this.waveSurfer.on('play', () => {
      this.isPlaying = true;
    })

    this.waveSurfer.on('pause', () => {
      this.isPlaying = false;
    })
  }

  playAudio() {
    this.waveSurfer.play();
  }

  pauseAudio() {
    this.waveSurfer.pause();
  }

  stopAudio() {
    this.waveSurfer.stop();
  }

  async initWaveSurfer(container: string, audio: any) {
    this.waveSurfer = WaveSurfer.create({
      container: container,
      url: audio,
      waveColor: 'violet',
      progressColor: 'purple',
      barWidth: 2,
      barRadius: 2
    });
    this.events();
    this.waveSurfer.stop();
    this.isPlaying = false;
  }

  async getMicrophoneAccess() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.setupMediaRecorder();
    } catch (err) {
      console.error('Error accessing the microphone', err);
    }
  }

  async startAudio() {
    this.isRecording = true;
    await this.getMicrophoneAccess();
    if (this.mediaRecorder && this.mediaRecorder.state === 'inactive') {
      this.mediaRecorder.start();
      this.listening = true;
      this.showButtons = true;
      console.log('Recording started');
    }
  }

  async endAudio() {
    this.isRecording = false;
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
      console.log('Recording stopped');
    }
  }

  async sendAudio() {
    this.loading.set(true);
    console.log(this.blobAudio);
    (await this.listeningService.processListening(this.blobAudio)).subscribe(result => {
      console.log(result);
      alert(result)
      this.loading.set(false);
      this.closeAndReload();
    })
  }

  setupMediaRecorder() {
    this.mediaRecorder.ondataavailable = (event) => {
      this.chunks.push(event.data);
    };

    this.mediaRecorder.onerror = (error) => {
      console.error('Error in media recorder:', error);
    };

    this.mediaRecorder.onstart = () => {
      this.chunks = [];
      console.log('Recording started');
    };

    this.mediaRecorder.onstop = async () => {
      const blob = new Blob(this.chunks, { type: 'audio/mp3' });
      this.chunks = [];
      this.blobAudio = blob;
      let audioURL;
      if (typeof window !== 'undefined') {
        audioURL = window.URL.createObjectURL(blob);
      }
      const audio = new Audio(audioURL);
      console.log('Recording URL:', audioURL);
      audio.play();
      await this.initWaveSurfer(this.waveformEl.nativeElement, audio.src);
      await this.waveSurfer.play();
    };
  }

  downloadAudio() {
    this.loading.set(true);
    if (this.blobAudio) {
      let url = '';
      if (typeof window !== 'undefined') {
        url = window.URL.createObjectURL(this.blobAudio);
      }
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'audio.mp3';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
    this.loading.set(false);
    this.closeAndReload();
  }

  closeAndReload(){
    this.isRecording = false;
    this.listening = false;
    this.isPlaying = false;
    this.showButtons = false;
    this.waveSurfer.destroy();
  }
}

