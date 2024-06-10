import { MenuService } from './../../services/menu.service';
import { Component, OnInit } from '@angular/core';
import { Subscription, first } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  results_promoted: { name: string, votes: number, photo: string, percentage: number }[] = [];
  results_regular: { name: string, votes: number, photo: string, percentage: number }[] = [];
  comparison: any[] = [];

  private resSubs: Subscription = new Subscription();

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.fetchResults(1);
    this.fetchResults(2);
  }

  fetchResults(menuId: number): void {
    this.resSubs = this.menuService.getResults(menuId).pipe(first()).subscribe(
      data => {
        const totalVotes = data.reduce((acc: number, item: any) => acc + item.votes, 0);
        const processedResults = data.map((dish: { name: any; votes: number; photo: string}) => ({
          name: dish.name,
          votes: dish.votes,
          photo: `assets/${dish.photo}`,
          percentage: totalVotes>0 ?((dish.votes / totalVotes) * 100).toFixed(0): 0
        })).sort((a: { votes: number; }, b: { votes: number; }) => b.votes - a.votes);;
        console.log(processedResults);
        if (menuId === 1) {
          this.results_promoted = processedResults;
        } else {
          this.results_regular = processedResults;
        }
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  // fetchResults(menuId: number): void {
  //   this.resSubs = this.menuService.getResults(menuId).pipe(first()).subscribe(
  //     data => {
  //       let votes =  data[menuId].map((dish: { id: number, name: string; votes: number; photo: string, description: string })=> 
  //         ({ name: dish.name, votes: dish.votes, photo: dish.photo, description: dish.description }))
  //         .sort((a: { votes: number; }, b: { votes: number; }) => b.votes - a.votes);
  //       if (menuId === 1) {      
  //       this.results_promoted = votes; 
  //       }
  //       if (menuId === 2) {
  //         this.results_regular = votes;
  //       }
  //     },
  //     error => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }  
  
  // getPhoto(dish: number): string {
  //   const photos: { [key: number]: string } = {
  //     1: 'assets/dish1.jpg',
  //     2: 'assets/dish2.jpg',
  //     3: 'assets/dish3.jpg',
  //     4: 'assets/dish4.jpg'    };
  //   return photos[dish] || 'assets/default.jpg'; // Fallback to a default image if the dish is not found
  // }


  compareResults(): void {
    this.comparison = this.results_promoted.map((item1, index) => {
      const item2 = this.results_regular[index];
      const totalVotes1 = this.results_promoted.reduce((acc, item) => acc + item.votes, 0);
      const totalVotes2 = this.results_regular.reduce((acc, item) => acc + item.votes, 0);

      const percentage1 = ((item1.votes / totalVotes1) * 100).toFixed(2);
      const percentage2 = ((item2.votes / totalVotes2) * 100).toFixed(2);

      return {
        name1: item1.name,
        votes1: item1.votes,
        percentage1,
        name2: item2.name,
        votes2: item2.votes,
        percentage2
      };
    });
  }

  ngOnDestroy(): void {
    if (this.resSubs) {
    this.resSubs.unsubscribe();
    }
  }
}
