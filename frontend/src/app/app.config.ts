import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  NativeDateAdapter
} from '@angular/material/core';

import { routes } from './app.routes';
import { ET_DATE_FORMATS, EtDateAdapter } from './et-date-adapter';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    
    { provide: LOCALE_ID, useValue: 'et-EE' },
    { provide: MAT_DATE_LOCALE, useValue: 'et-EE' },
    { provide: NativeDateAdapter, useClass: EtDateAdapter },
    { provide: DateAdapter, useClass: EtDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: ET_DATE_FORMATS }
  ]
};