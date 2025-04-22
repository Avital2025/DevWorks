import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router'; // ייבוא provideRouter
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // נתיבים שלך
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { interceptor } from './interseptors/interceptor.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
     provideAnimationsAsync() , provideHttpClient(withInterceptors([interceptor]))
  ]
})
  .catch((err) => console.error(err));

  
