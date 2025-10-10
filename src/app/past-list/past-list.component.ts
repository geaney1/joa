import { Component } from '@angular/core';
import Item from '../models/Item';
import { HackerNewsService } from '../services/hacker-news.service';
import { NewsCardComponent } from '../news-card/news-card.component';

@Component({
  selector: 'app-past-list',
  standalone: true,
  imports: [NewsCardComponent],
  templateUrl: './past-list.component.html',
  styleUrl: './past-list.component.css',
})
export class PastListComponent {
  title: string = 'Past Stories';
  currentPage = 1;
  itemCounter: number = 0;

  public stories: Array<Item> = [];

  public constructor(public newsService: HackerNewsService) {
    this.fetchData(this.currentPage);
  }

  fetchData(page: number): void {
    this.newsService.paststories(page, 1).subscribe((stories) => {
      return (this.stories = stories);
    });
  }

  loadNextPage(): void {
    this.itemCounter += this.stories.length;
    this.stories = [];
    this.currentPage++;
    this.fetchData(this.currentPage);
  }

  lastPage(): boolean {
    return this.stories.length ===0;
  }

  getCounter(i: number): number {
    return this.itemCounter + i;
  }
}
