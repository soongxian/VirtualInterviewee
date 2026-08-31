import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import {
  ArrowUpOutline,
  CheckOutline,
  CopyOutline,
  DeleteOutline,
  LoadingOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  PlusOutline,
} from '@ant-design/icons-angular/icons';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideNzIcons([
      ArrowUpOutline,
      CheckOutline,
      CopyOutline,
      DeleteOutline,
      LoadingOutline,
      MenuFoldOutline,
      MenuUnfoldOutline,
      PlusOutline,
    ]),
  ],
};
