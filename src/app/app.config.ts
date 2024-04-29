import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient, HttpClientModule, HttpClientJsonpModule,  } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideToastr()]
}

