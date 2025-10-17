import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NewsCardComponent } from '../news-card/news-card.component';
import { HackerNewsService } from '../services/hacker-news.service';
import { Item } from '../models/Item';
import { Subject, switchMap } from 'rxjs';

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
  getStoriesFunc = 'getOtherStories';
  maxFetchCount = 20;

  public stories: Item[] = [];
  private storyClick$ = new Subject<string>();

  constructor(
    public newsService: HackerNewsService,
    private route: ActivatedRoute
  ) {
    this.storyClick$
      .pipe(
        switchMap((storyType) =>
          storyType === PastStories
            ? this.newsService.getPastStories(
                this.currentPage,
                this.storyType,
                this.maxFetchCount
              )
            : this.newsService.getOtherStories(
                this.currentPage,
                this.storyType,
                this.maxFetchCount
              )
        )
      )
      .subscribe((stories) => (this.stories = stories));
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.storyType = params.get('storytype') ?? 'topstories';
      if (this.storyType === PastStories) {
        this.getStoriesFunc = 'getPastFSrories';
        this.maxFetchCount = 40;
      }
      this.storyClick$.next(this.storyType); // triggers new request
    });
  }

  fetchData(): void {
    if (this.storyType === PastStories) {
      this.newsService
        .getPastStories(this.currentPage, this.storyType, this.maxFetchCount)
        .subscribe((stories: Array<Item>) => (this.stories = stories));
    } else {
      this.newsService
        .getOtherStories(this.currentPage, this.storyType, this.maxFetchCount)
        .subscribe((stories: Array<Item>) => (this.stories = stories));
    }
  }

  loadNextPage(): void {
    this.itemCounter += this.stories.length;
    this.stories = [];
    this.currentPage++;
    this.fetchData();
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
