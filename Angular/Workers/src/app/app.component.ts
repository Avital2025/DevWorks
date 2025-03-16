import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from '../components/auth/auth.component';
import { NavbarComponent } from '../components/navbar/navbar.component';


@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavbarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Workers';
}
