import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class ModelColorService {
  // urlWebSocket = environment.api_ws + '/process-video-ws/'
  urlWebSocket = environment.api_ws

  contentVideoStreaming() {
    return webSocket(this.urlWebSocket)
  }
}
