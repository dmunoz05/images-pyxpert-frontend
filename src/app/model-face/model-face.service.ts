import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class ModelFaceService {
  urlWebSocket = environment.api_ws
  urlHttpWebSocket = environment.api_wss_http

  contentVideoStreaming() {
    return webSocket(this.urlWebSocket)
  }
}
