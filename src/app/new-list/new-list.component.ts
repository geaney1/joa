import { Component, OnInit } from '@angular/core';
import { HackerNewsService } from '../services/hacker-news.service';
import Item from '../models/Item';
import { NewsCardComponent } from '../news-card/news-card.component';

@Component({
  selector: 'app-new-list',
  standalone: true,
  imports: [NewsCardComponent],
  templateUrl: './new-list.component.html',
  styleUrl: './new-list.component.css',
})
export class NewListComponent {
  title: string = 'New Stories';
  currentPage = 1;

  public stories: Array<Item> = [];

  public constructor(public newsService: HackerNewsService) {
    this.fetchData(this.currentPage);
  }

  fetchData(page: number): void {
    this.newsService
      .newstories(page)
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
    return this.currentPage > 1 ? (this.currentPage - 1) * 20 + i : i;
  }
}
