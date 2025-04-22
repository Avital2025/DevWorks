import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,MatIconModule,RouterModule,NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})



export class HomeComponent {
  
  
  isLogin: boolean = false; // במידה וצריך לנהל את מצב ההתחברות של המשתמש
 
  
  
  constructor(private router: Router) {}
  blogs = [
    {
      title: 'איך לבחור פרויקט שיקפיץ אתכם קדימה?',
      summary: 'כך תזהו פרויקט שישדרג אתכם מקצועית ואישית.',
      content: `הרבה פעמים סטודנטים או מפתחים בתחילת הדרך מתלבטים האם להצטרף לפרויקט מסוים.
      חשוב לשים לב לפרויקטים שכוללים שימוש בטכנולוגיות עכשוויות, עבודה בצוות, חיבור למערכת קיימת או דרישות שמדמות פרויקט אמיתי מהתעשייה.
      פרויקט טוב ייתן לכם ערך לקורות חיים וגם ביטחון עצמי שתצברו בעבודה עצמאית או שיתופית.`,
      expanded: false
    },
    {
      title: 'מה באמת מעניין מעסיקים?',
      summary: 'פירוק של דרישות נפוצות – איפה להשקיע מאמץ.',
      content: `מעסיקים בוחנים קורות חיים בעיניים מאוד ממוקדות. הם רוצים לראות ניסיון רלוונטי, הבנה בפרקטיקות עבודה,
      עבודה עם כלי ניהול גרסאות כמו Git, תיעוד נכון של פרויקטים, ויכולת פתרון בעיות. חשוב לא פחות – הצגה ברורה של תוצאות:
      כמה זמן עבדתם, מה השגתם, ומה תרומתכם. כדאי להשקיע זמן בניסוח ברור, לא ארוך מדי, וממוקד בתרומה האישית.`,
      expanded: false
    },
    {
      title: 'האם כדאי לכם להתמקד בפרונטאנד או בבקאנד?',
      summary: 'כך תבינו איפה נקודת החוזק שלכם באמת.',
      content: `העולם נחלק לאנשים שאוהבים לראות תוצאה ויזואלית – ולעבוד על החוויה, ולעומתם – אנשים שאוהבים לוגיקה, ביצועים, ואינטגרציה עם מערכות אחרות.
      כדאי להתחיל בשניהם, אבל עם הזמן להבין מה יותר מדבר אליכם. חשוב לדעת מעט מכל תחום, אך המיקוד בתחום חזק אחד יקדם אתכם הרבה יותר במציאת עבודה.`,
      expanded: false
    }
  ];
  
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  toggleBlog(blog: any) {
    blog.expanded = !blog.expanded;
  }
  



  // goToLogin() {
  //   this.router.navigate(['/login']);
  // }

  // goToAbout() {
  //   this.router.navigate(['/about']);
  // }

  // goToBrowseJobs() {
  //   this.router.navigate(['/jobs']);
  // }
}
