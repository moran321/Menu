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


  getClassBasedOnVotes(votes: number): string {
    if (votes >= 50) {
      return 'votes-high';
    } else if (votes >= 20) {
      return 'votes-medium';
    } else {
      return 'votes-low';
    }
  }

  ngOnDestroy(): void {
    if (this.resSubs) {
    this.resSubs.unsubscribe();
    }
  }
}
