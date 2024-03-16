import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import 'dotenv/config';

const serverEnvConfig = {
  environment: {
    API_URL: process.env['API_URL'] || 'default_value'
  }
};

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
  ],
  ...serverEnvConfig
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
