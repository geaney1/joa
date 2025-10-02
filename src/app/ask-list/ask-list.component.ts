import { Component } from '@angular/core';
import { HackerNewsService } from '../services/hacker-news.service';
import { NewsCardComponent } from '../news-card/news-card.component';
import Item from '../models/Item';

@Component({
  selector: 'app-ask-list',
  standalone: true,
  imports: [NewsCardComponent],
  templateUrl: './ask-list.component.html',
  styleUrl: './ask-list.component.css',
})
export class AskListComponent {
  title: string = 'Asked Stories';
  currentPage = 1;

  public stories: Array<Item> = [];

  public constructor(public newsService: HackerNewsService) {
    this.fetchData(this.currentPage);
  }

  fetchData(page: number): void {
    this.newsService
      .askstories(page)
       .subscribe((stories) => {
        return (this.stories = stories);
      });
  }

  loadNextPage(): void {
    this.stories = [];
    this.currentPage++;
    this.fetchData(this.currentPage);
  }

  lastPage(): boolean {
    return this.stories.length < 20;
  }

  getCounter(i: number): number {
    return this.currentPage > 1 ? ((this.currentPage - 1) * 20) + i : i;
  }
}
