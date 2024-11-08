import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject, signal } from '@angular/core'
import { GenerativeModel } from '@google/generative-ai'
import { IaServiceService } from './ia-service.service'
import { LayoutHomeService } from '../layouts/layout-home/layout-home.service'
import { HomeService } from '../home/home.service'
import { PhotoResponse } from '../../types/image.type'

export const PROMPT = `You are an expert Tailwind developer
You take screenshots of a reference web page from the user, and then build single page apps
using Tailwind and HTML.

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

Do not include markdown "\`\`\`" or "\`\`\`html" at the start or end.`

@Component({
  selector: 'app-ia',
  standalone: true,
  imports: [],
  templateUrl: './ia.component.html',
  styleUrl: './ia.component.css'
})
export class IaComponent implements OnInit {

  modelImage: GenerativeModel | undefined
  modelChat: GenerativeModel | undefined
  modelSelected = signal<string>('default')
  typeModel = signal<any[]>([{ name: 'Chose a model', value: 'default' }, { name: 'Gemini 1.5 Flash', value: 'gemini-1.5-flash' }, { name: 'Gemini 1.0 Pro Vision', value: 'gemini-1.5-flash-001' }])
  historyChat = signal<any[]>([])
  // historyChat = signal<any[]>([
  //   {
  //     role: "user",
  //     parts: [{ text: "Hello, I have 2 dogs in my house." }],
  //   },
  //   {
  //     role: "model",
  //     parts: [{ text: "Great to meet you. What would you like to know?" }],
  //   },
  // ])
  @Output() showSliderBarEvent = new EventEmitter<boolean>()
  messagePrompt = signal<string>('')
  #googleGeminiService = inject(IaServiceService)
  output = signal<string | null>(null)
  showPhoto = signal<boolean>(false)
  showIframe = signal<boolean>(false)
  dataPhoto: PhotoResponse[] = []
  fileDataPhoto: any
  @Input() userPicture: string | undefined
  @ViewChild('fileInput') fileInput: ElementRef | undefined

  constructor(private layoutHomeService: LayoutHomeService, private homeService: HomeService, private iaService: IaServiceService) {
  }

  ngOnInit(): void {
    this.loadModelWithApi()
  }

  async loadModelWithApi() {
    await this.iaService.processECB(this.iaService.btoaApiKey)
    this.modelImage = this.#googleGeminiService.createModelImages()
    this.modelChat = this.#googleGeminiService.createModelChat()
  }

  displaySliderBar() {
    if (this.layoutHomeService.displaySliderBar()) {
      this.showSliderBarEvent.emit(false)
      return
    }
    this.showSliderBarEvent.emit(true)
  }

  openFileInput() {
    this.fileInput?.nativeElement.click()
  }

  async onFileSelected(event: Event | null) {
    const inputElement = event?.target as HTMLInputElement
    if (inputElement.files && inputElement.files.length > 0) {
      const file: File = inputElement.files[0]
      if (!file.type.includes('image')) {
        alert('Select only images of type jpg, png o svg')
        return
      }
      this.fileDataPhoto = file
      this.homeService.processAnyPhoto(file).then((imgUrl: any) => {
        console.log(imgUrl)
        this.showPhoto.set(true)
        this.dataPhoto = [imgUrl]
      })
    }
  }

  async startprocessBwImageSelected(file: any) {
    this.showPhoto.set(false)
    const data = await this.fileToGenerativePart(file)
    this.generateCode(data)
  }

  async getFile(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      const file = target.files?.[0]
      const data = await this.fileToGenerativePart(file)
      this.generateCode(data)
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

  selectModel(event: Event) {
    const target = event.target as HTMLSelectElement
    const value = target.value
    if (value === 'default') {
      this.modelSelected.set(value)
      alert('Select a model')
    } else if (value === 'gemini-1.5-flash') {
      this.modelSelected.set(value)
      this.modelImage = this.#googleGeminiService.createModelChat()
    } else if (value === 'gemini-1.5-flash-001') {
      this.modelSelected.set(value)
      this.modelImage = this.#googleGeminiService.createModelImages()
    }
  }

  async generateCode(data: any) {
    if (!this.modelImage) return

    this.output.set(null)
    try {
      //Generative code
      // const result = await this.model.generateContent([PROMPT, data])
      // const response = result.response
      // const text = response.text()
      // this.output.set(text)

      const result = await this.modelImage.generateContentStream([PROMPT, data])
      let text = ''
      this.showIframe.set(true)
      for await (const chunk of result.stream) {
        const chunkText = chunk.text()
        text += chunkText
        this.output.set(text)
        console.log("Output: ", this.output)
        console.log("Text: ", text)
        // this.output.update(prev => prev += text)
      }
    } catch (error) {
      console.log("Error: ", error)

    }
  }

  handleMessage() {
    const input = document.getElementById(`prompt${this.modelSelected()}`) as HTMLInputElement
    const value = input.value.trim()
    if (value !== '') {
      this.messagePrompt.set(value)
      this.generateChatNotStreaming(input)
    }
  }

  async generateChat(target: any) {
    target.value = ''
    const chat = this.modelChat?.startChat({
      history: this.historyChat(),
      generationConfig: {
        maxOutputTokens: 100,
      },
    })

    const msg = this.messagePrompt()
    const result = await chat?.sendMessageStream(msg)

    //Response with stream
    const stream = result?.stream
    const { value, done: isDone }: any = await stream?.next()
    const text = value.text()
    console.log(text)
  }

  async generateChatNotStreaming(target: any) {
    target.value = ''
    const chat = this.modelChat?.startChat({
      history: this.historyChat(),
      generationConfig: {
        maxOutputTokens: 100,
      },
    })

    const msg = this.messagePrompt()
    const result = await chat?.sendMessage(msg)
    const response = result?.response
    const text = response?.text()
    this.output.set(text || '')
    console.log(text);
  }

  handleEnterPress(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.value.trim() !== '') {
      this.messagePrompt.set(target.value)
      this.generateChatNotStreaming(target)
    }
  }
}
