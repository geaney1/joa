import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NewsCardComponent } from '../news-card/news-card.component';
import { HackerNewsService } from '../services/hacker-news.service';
import { Item } from '../models/Item';

export const PastStories = 'paststories';

@Component({
  selector: 'app-hacker-news-list',
  standalone: true,
  imports: [NewsCardComponent],
  templateUrl: './hacker-news-list.component.html',
  styleUrls: ['./hacker-news-list.component.css'], // ✅ corrected from `styleUrl`
})
export class HackerNewsListComponent implements OnInit {
  title = 'Hacker News';
  currentPage = 1;
  itemCounter = 0;
  storyType = 'topstories';
  maxFetchCount = 20;

  public stories: Item[] = [];

  constructor(
    public newsService: HackerNewsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.storyType = params.get('storytype') ?? 'topstories';
      this.fetchData(this.currentPage);
    }); 
  }

  fetchData(page: number): void {
    if (this.storyType === PastStories) {
      this.maxFetchCount = 40;
      this.newsService
        .getPastStories(page, this.storyType, this.maxFetchCount)
        .subscribe((stories: Array<Item>) => (this.stories = stories));
    } else {
      this.maxFetchCount = 20;
      this.newsService
        .getOtherStories(page, this.storyType, this.maxFetchCount)
        .subscribe((stories: Array<Item>) => (this.stories = stories));
    }
  }

  loadNextPage(): void {
    this.itemCounter += this.stories.length;
    this.stories = [];
    this.currentPage++;
    this.fetchData(this.currentPage);
  }

  lastPage(): boolean {
    return (
      this.storyType === PastStories || this.stories.length < this.maxFetchCount
    );
  }

  getCounter(i: number): number {
    return this.itemCounter + i;
  }
}
