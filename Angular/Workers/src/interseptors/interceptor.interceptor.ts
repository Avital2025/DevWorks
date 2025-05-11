import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { BrowserStorageService } from '../services/browser-storage.service';

export const interceptor: HttpInterceptorFn = (req, next) => {
  const browserStorage = inject(BrowserStorageService);
  const token = browserStorage.getItem('token');

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedRequest);
  }

  return next(req);
};
