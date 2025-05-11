import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class BrowserStorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getItem(key: string): string | null {
    return this.isBrowser ? sessionStorage.getItem(key) : null;
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser) sessionStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    if (this.isBrowser) sessionStorage.removeItem(key);
  }

  clear(): void {
    if (this.isBrowser) sessionStorage.clear();
  }
}
