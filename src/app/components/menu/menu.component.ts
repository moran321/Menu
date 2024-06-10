// menu.component.ts
import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  dishes: any[] = [];
  selectedDish: any;
  confirmationMessage: string = '';
  hasVoted: boolean = false;
  menuId: number = 0;
  isSubmitting = false;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.checkIfVoted();
    this.menuId = Math.random() < 0.5 ? 1 : 2; // Randomly assign menuId 1 or 2
    this.menuService.getMenu(this.menuId).pipe(first()).subscribe(data => {
      console.log(data)
      this.dishes = data;
    });
  }

  checkIfVoted(): void {
    this.hasVoted = localStorage.getItem('hasVoted') === 'true';
    if (this.hasVoted) {
      this.confirmationMessage = 'You have already voted.';
    }
  }

  selectDish(dish: any): void {
    this.selectedDish = dish;
  }

  vote(): void {
    if (this.hasVoted) {
      this.confirmationMessage = 'You have already voted.';
      return;
    }
    if (this.selectedDish) {
      this.isSubmitting = true;
      this.menuService.vote(this.selectedDish.id, this.menuId).pipe(first()).subscribe(
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
    this.isSubmitting = false;
  }

 

 
}
