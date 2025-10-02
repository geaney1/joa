import { Component } from '@angular/core';
import { NewsCardComponent } from '../news-card/news-card.component';
import Item from '../models/Item';
import { HackerNewsService } from '../services/hacker-news.service';

@Component({
  selector: 'app-hacker-news-list',
  imports: [NewsCardComponent],
  templateUrl: './hacker-news-list.component.html',
  styleUrl: './hacker-news-list.component.css',
  standalone: true,
})
export class HackerNewsListComponent {
  title: string = 'Hacker News';
  currentPage = 1;

  public stories: Array<Item> = [];

  public constructor(public newsService: HackerNewsService) {
    this.fetchData(this.currentPage);
  }

  fetchData(page: number): void {
    this.newsService
      .topstories(page)
      .subscribe((stories: Array<Item>) => (this.stories = stories));
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
