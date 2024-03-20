import { Component, inject, signal } from '@angular/core'
import { GenerativeModel } from '@google/generative-ai'
import { IaServiceService } from './ia-service.service'

export const PROMPT = `You are an expert Tailwind developer
You take screenshots of a reference web page from the user, and then build single page apps
using Tailwind, HTML and JS.

- Make sure the app looks exactly like the screenshot.
- Pay close attention to background color, text color, font size, font family,
padding, margin, border, etc. Match the colors and sizes exactly.
- Use the exact text from the screenshot.
- Do not add comments in the code such as "<!-- Add other navigation links as needed -->" and "<!-- ... other news items ... -->" in place of writing the full code. WRITE THE FULL CODE.
- Repeat elements as needed to match the screenshot. For example, if there are 15 items, the code should have 15 items. DO NOT LEAVE comments like "<!-- Repeat for each news item -->" or bad things will happen.
- For images, use placeholder images from https://placehold.co and include a detailed description of the image in the alt text so that an image generation AI can generate the image later.
- Add support for responsive mode for mobile screens

In terms of libraries,
- Use this script to include Tailwind: <script src="https://cdn.tailwindcss.com"></script>
- You can use Google Fonts
- Font Awesome for icons: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>

Do not include markdown "\`\`\`" or "\`\`\`html" at the start or end.`;

@Component({
  selector: 'app-ia',
  standalone: true,
  imports: [],
  templateUrl: './ia.component.html',
  styleUrl: './ia.component.css'
})
export class IaComponent {

  model: GenerativeModel;

  #googleGeminiService = inject(IaServiceService)

  output = signal<string | null>(null)

  constructor() {
    this.model = this.#googleGeminiService.createModel()
  }

  button() {
    alert("Button")
  }

  async getFile(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      const file = target.files?.[0]
      const data = await this.fileToGenerativePart(file)
      console.log(data);
      this.generateCode(data);
    }
  }

  // Converts a File object to a GoogleGenerativeAI.Part object.
  async fileToGenerativePart(file: File) {
    const base64EncodedDataPromise = new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve((reader.result as string).split(',')[1])
      reader.readAsDataURL(file)
      reader.onerror = (error) => reject(error)
    })
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    }
  }

  async generateCode(data: any) {
    if (!this.model) return

    this.output.set(null)
    try {
      //Generative code
      const result = await this.model.generateContent([PROMPT, data])
      const response = result.response
      const text = response.text();
      this.output.set(text)
      console.log(text);

      // const result = await this.model.generateContentStream([PROMPT, data]);
      // let text = '';
      // for await (const chunk of result.stream) {
      //   const chunkText = chunk.text();
      //   console.log(chunkText);
      //   text += chunkText;
      //   this.output.update(text => text += '\n' + chunkText)
      // }
    } catch (error) {
      console.log(error);

    }
  }

  // async run() {
  //   // For text-and-images input (multimodal), use the gemini-pro-vision model
  //   const modelo = this.model.getGenerativeModel({ model: "gemini-pro-vision" });

  //   const prompt = "What's different between these pictures?";

  //   const fileInputEl = document.querySelector("input[type=file]");
  //   const imageParts = await Promise.all(
  //     [...fileInputEl.files].map(this.fileToGenerativePart)
  //   );

  //   const result = await model.generateContent([prompt, ...imageParts]);
  //   const response = await result.response;
  //   const text = response.text();
  //   console.log(text);
  // }

}
