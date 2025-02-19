import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loaderInterceptor } from './Interceptors/loader.interceptor';
import { authInterceptor } from './Interceptors/auth.interceptor';
import { initializeApp } from './app-initializer';
import { ModelsService } from './API/models.api/models.service';
import { HousesService } from './API/houses.api/houses.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(
    withInterceptors([loaderInterceptor,authInterceptor])
  ),
  {
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    deps: [ModelsService,HousesService],
    multi: true,
  }
]
};


