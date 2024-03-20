import { Injectable } from '@angular/core'
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class IaServiceService {

  API_KEY: string = environment.api_gemini
  gentAi = new GoogleGenerativeAI(this.API_KEY)

  createModelImages() {
    return this.gentAi.getGenerativeModel({
      model: 'gemini-pro-vision',
      generationConfig: {
        maxOutputTokens: 4096
      }
    })
  }

  createModelChat() {
    return this.gentAi.getGenerativeModel({
      model: 'gemini-pro',
      generationConfig: {
        maxOutputTokens: 4096
      }
    })
  }
}
