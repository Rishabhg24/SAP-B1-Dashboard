import {

  ApplicationConfig,

  provideBrowserGlobalErrorListeners

} from '@angular/core';

import {

  provideRouter

} from '@angular/router';

import {

  provideHttpClient,

  withFetch,

  withInterceptors

} from '@angular/common/http';

import {

  jwtInterceptor

} from './interceptors/jwt-interceptor';

import {

  routes

} from './app.routes';

import {

  provideClientHydration,

  withEventReplay

} from '@angular/platform-browser';

export const appConfig:

ApplicationConfig = {

  providers: [

    // GLOBAL ERRORS

    provideBrowserGlobalErrorListeners(),

    // ROUTES

    provideRouter(routes),

    // HTTP + JWT INTERCEPTOR

    provideHttpClient(

      withFetch(),

      withInterceptors([

        jwtInterceptor
      ])
    ),

    // HYDRATION

    provideClientHydration(

      withEventReplay()
    )
  ]
};