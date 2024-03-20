import { Injectable } from '@angular/core';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';


@Injectable({
  providedIn: 'root'
})
export class IaServiceService {

  // API_KEY: string = "";

  createModel() {
    const api = new GoogleGenerativeAI("");
    return api.getGenerativeModel({
      model: 'gemini-pro-vision',
      generationConfig: {
        maxOutputTokens: 4096
      }
    });
  }
}
