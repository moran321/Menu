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
  isLoading = true;
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.checkIfVoted();
    this.menuService.getMenu().pipe(first()).subscribe(data => {
      console.log(data)
      this.menuId = data.id;
      this.dishes = data.menu;
      this.isLoading = false;
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
