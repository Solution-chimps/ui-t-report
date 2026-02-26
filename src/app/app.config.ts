import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';

import { routes } from './app.routes';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#D4A63F',
  bgsOpacity: 0.5,
  bgsPosition: 'center-center',
  bgsSize: 60,
  bgsType: 'square-jelly-box',

  blur: 4,
  delay: 0,
  fastFadeOut: true,

  fgsColor: '#D4A63F',
  fgsPosition: 'center-center',
  fgsSize: 50,
  fgsType: 'square-loader',

  gap: 24,

  logoPosition: 'center-center',
  logoSize: 120,
  logoUrl: '',

  masterLoaderId: 'master',

  overlayBorderRadius: '0',
  overlayColor: 'rgba(40, 40, 40, 0.8)',

  pbColor: '#D4A63F',
  pbDirection: 'rtl',
  pbThickness: 3,
  hasProgressBar: true,

  text: '',
  textColor: '#FFFFFF',
  textPosition: 'center-center',

  maxTime: -1,
  minTime: 300
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    importProvidersFrom(NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)),
    importProvidersFrom(NgxUiLoaderRouterModule.forRoot({
      showForeground: true,
    })),
    importProvidersFrom(NgxUiLoaderHttpModule),
    provideToastr({
      timeOut: 5000,
      autoDismiss: true,
      preventDuplicates: true,
      tapToDismiss: true,
      progressAnimation: 'decreasing'
    })
  ]
};
