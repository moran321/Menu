// menu.component.ts
import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  dishes = [
    { id: 1, name: 'פילה עוף דה שילס עם הרוטב הסודי 49', photo: 'dish1.jpg', 
    description: 'נתחי פילה עוף עסיסיים בעשבי תיבול טריים, צלויים על גריל פחמים ייחודי. מלווה ברוטב הסודי של השף, המוסיף עומק ועושר טעמים. מוגש עם ירקות קלויים- פלפלים צבעוניים, זוקיני עגבניות שרי וויטני ובצל סגול.' },
    { id: 2, name: 'חזה עוף במרינדת לימון ושום 52', photo: 'dish2.jpg', 
    description: 'חזה עוף צרוב מתובל במרינדת לימון ושום. מוגש עם תפוחי אדמה אפויים וסלט ירוק קטן.' },
    { id: 3, name: 'עוף מוקפץ עם ירקות ואורז 48', photo: 'dish3.jpg', 
    description: 'נתחי עוף מוקפצים עם פלפלים, גזר, ברוקולי, שעועית ובצל ירוק, מוגשים על מצע של אורז יסמין.' },
    { id: 4, name: 'שניצל עוף פריך עם פירה 50', photo: 'dish4.jpg', 
    description: 'חזה עוף מצופה בפרורי לחם מטוגנים, מוגש עם פירה וסלט כרוב-גזר במיונז.' }
  ];  
  selectedDish: any;
  confirmationMessage: string = '';
  hasVoted: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.checkIfVoted();
  }

  checkIfVoted(): void {
    this.hasVoted = localStorage.getItem('hasVoted') === 'true';
    if (this.hasVoted) {
      this.confirmationMessage = 'You have already voted.';
    }
  }

  vote(): void {
    if (this.hasVoted) {
      this.confirmationMessage = 'You have already voted.';
      return;
    }
    if (this.selectedDish) {
      this.menuService.vote(this.selectedDish.id).subscribe(
        response => {
          this.confirmationMessage = 'Thank you for your vote!';
          localStorage.setItem('hasVoted', 'true');
          this.hasVoted = true;
        },
        error => {
          console.error('Error:', error);
        }
      );
    } else {
      alert('Please select a dish!');
    }
  }

  selectDish(dish: any): void {
    this.selectedDish = dish;
  }

  // fetchResults(): void {
  //   this.resSubs = this.menuService.getResults().subscribe(
  //     data => {
  //       this.results = data;
  //     },
  //     error => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }

 
}
