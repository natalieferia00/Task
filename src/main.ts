import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { initializeApp } from 'firebase/app';
import { APP_INITIALIZER } from '@angular/core';
import {
  getRemoteConfig,
  fetchAndActivate,
  getValue,
  getAll,
} from 'firebase/remote-config';
import { FirebaseConfig } from '../src/app/firebase.component';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

const firebaseConfig = {
  apiKey: 'AIzaSyAcv1aR-5AbyXKEhWtEA-shyPgxAh1oQOY',
  authDomain: 'task-79ab2.firebaseapp.com',
  projectId: 'task-79ab2',

  storageBucket: 'task-79ab2.firebasestorage.app',
  messagingSenderId: 'SENDER_ID',
  appId: '1:153825171377:android:ee7075db8c1b60d3358f90',
};

const app = initializeApp(firebaseConfig);

const remoteConfig = getRemoteConfig(app);

remoteConfig.settings.minimumFetchIntervalMillis = 0;

remoteConfig.defaultConfig = {
  welcome_message: 'Welcome',
};

function initializeConfig(firebaseConfig: FirebaseConfig) {
  return async () => {
    await initializeRemoteConfig(firebaseConfig);
  };
}

export async function initializeRemoteConfig(firebaseConfig: FirebaseConfig) {
  try {
    const fetchResult = await fetchAndActivate(remoteConfig);

    if (fetchResult) {
      console.log('Configuración remota cargada y activada con éxito');
    } else {
      console.log('No se activaron nuevos valores remotos', fetchResult);
    }
    const allParams = getAll(remoteConfig);

    Object.entries(allParams).forEach(([key, val]) => {
      console.log(
        `key=${key}, value=${val.asString()}, source=${val.getSource()}`
      );
    });

    firebaseConfig.setRemoteConfig(remoteConfig);
    console.log(getValue(remoteConfig, 'welcome_message'));
  } catch (error) {
    console.error('Error al inicializar Remote Config:', error);
  }
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeConfig,
      deps: [FirebaseConfig],
      multi: true,
    },
  ],
});
