import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router'; // ייבוא provideRouter
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // נתיבים שלך
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), 
    provideAnimations(),
    provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync() // הוספת ה-routing
  ]
})
  .catch((err) => console.error(err));

  
