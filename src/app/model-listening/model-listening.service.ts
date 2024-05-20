import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelListeningService {

  constructor(private http: HttpClient) { }

  convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  async processListening(audioBlob: Blob): Promise<Observable<any>> {
    const base64Audio = await this.convertBlobToBase64(audioBlob);
    // const audioWithoutPrefix = base64Audio.split(';base64,')[1];
    const requestBody = { audio: base64Audio };
    console.log('Audio en Base64:', base64Audio);
    return this.http.post(`${environment.api_django}/process-model-listening/`, requestBody)
      .pipe(
        switchMap(async (response: any) => {
          const result = response.message
          return result
        })
      )
  }

}
