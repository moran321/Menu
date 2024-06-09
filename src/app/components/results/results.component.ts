import { MenuService } from './../../services/menu.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  results: { name: string, votes: number, photo: string }[] = [];

  private resSubs: Subscription = new Subscription();

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    console.log('ResultsComponent initialized');
    this.fetchResults();
  }

  
  fetchResults(): void {
    this.resSubs = this.menuService.getResults().subscribe(
      data => {
        this.results =
        data.map((dish: { id: number, name: string; votes: number; })=> ({ name: dish.name, votes: dish.votes, photo: this.getPhoto(dish.id) }))
        .sort((a: { votes: number; }, b: { votes: number; }) => b.votes - a.votes);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  getPhoto(dish: number): string {
    const photos: { [key: number]: string } = {
      1: 'assets/dish1.jpg',
      2: 'assets/dish2.jpg',
      3: 'assets/dish3.jpg',
      4: 'assets/dish4.jpg'    };
    return photos[dish] || 'assets/default.jpg'; // Fallback to a default image if the dish is not found
  }

  ngOnDestroy(): void {
    this.resSubs.unsubscribe();
  }
}
