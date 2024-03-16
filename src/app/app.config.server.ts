import { mergeApplicationConfig, ApplicationConfig } from '@angular/core'
import { provideServerRendering } from '@angular/platform-server'
import { appConfig } from './app.config'
import * as dotenv from 'dotenv';

// Carga las variables de entorno desde el archivo .env
dotenv.config({ path: '../../.env' });

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
  ],
}

export const config = mergeApplicationConfig(appConfig, serverConfig)
