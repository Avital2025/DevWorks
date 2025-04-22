// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-footer',
//   standalone: true,
//   imports: [],
//   templateUrl: './footer.component.html',
//   styleUrl: './footer.component.css'
// })
// export class FooterComponent {
//   isHuman = false;
//   toggleCheck() {
//     this.isHuman = !this.isHuman; // Toggle the checkbox state
//   }

//   onSubmit(event: Event) {

//     event.preventDefault();

//     if (this.isHuman) {
//       alert('טוב נו... לא באמת חשבתם שזה ישלח, כן?');
//     } else {
//       alert('אנא אשר שאתה לא רובוט.');
//     }
//   }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {}
