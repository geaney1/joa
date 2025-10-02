import { Component } from '@angular/core';
import { HackerNewsService } from '../services/hacker-news.service';
import { NewsCardComponent } from '../news-card/news-card.component';
import Item from '../models/Item';

@Component({
  selector: 'app-show-list',
  standalone: true,
  imports: [NewsCardComponent],
  templateUrl: './show-list.component.html',
  styleUrl: './show-list.component.css',
})
export class ShowListComponent {
  title: string = 'Show Stories';
  currentPage = 1;

  public stories: Array<Item> = [];

  public constructor(public newsService: HackerNewsService) {
    this.fetchData(this.currentPage);
  }

  fetchData(page: number): void {
    this.newsService
      .showstories(page)
      .subscribe((stories: Item[]) => (this.stories = stories));
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
