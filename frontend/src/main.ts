import { bootstrapApplication } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeEt from '@angular/common/locales/et';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

registerLocaleData(localeEt);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));