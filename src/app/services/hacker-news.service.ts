import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { Item } from '../models/Item';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HackerNewsService {
  private storIdList: number[] = [];
  private currentStoryType: string = '';
  private readonly baseUrl: string = 'https://hacker-news.firebaseio.com/v0';

  constructor(private http: HttpClient) {}

  public getOtherStories(
    page: number,
    storytype: string,
    maxFetchCount: number
  ): Observable<Array<Item>> {
    if (this.currentStoryType !== storytype) {
      // clear the array if a different story type menu option is selected
      this.storIdList = [];
      this.currentStoryType = storytype;
    }
    const start = Math.max(0, (page - 1) * maxFetchCount);

    // Helper: slice the story IDs for the requested page
    const sliceIds = (ids: number[]) =>
      ids.slice(start, Math.min(start + maxFetchCount, ids.length));

    const fetchItems = (ids: number[]) =>
      forkJoin(
        sliceIds(ids).map((id) =>
          this.http.get<Item>(`${this.baseUrl}/item/${id}.json`)
        )
      );

    if (!this.storIdList || this.storIdList.length === 0) {
      return this.http
        .get<Array<number>>(`${this.baseUrl}/${storytype}.json`)
        .pipe(
          tap((ids) => (this.storIdList = ids)), // cache ids
          switchMap((ids) => fetchItems(ids))
        );
    } else {
      return fetchItems(this.storIdList);
    }
  }

  public getPastStories(
    page: number,
    storytype: string,
    maxFetchCount: number
  ): Observable<Array<Item>> {
    if (this.currentStoryType !== storytype) {
      // clear the array if a different story type menu option is selected
      this.storIdList = [];
      this.currentStoryType = storytype;
    }
    const cutoffTimestamp = this.getLastMidnightUnix();

    const start = Math.max(0, (page - 1) * maxFetchCount);

    // Helper: slice the story IDs for the requested page
    const sliceIds = (ids: number[]) =>
      ids.slice(start, Math.min(start + maxFetchCount, ids.length));

    const fetchItems = (ids: number[]) =>
      forkJoin(
        sliceIds(ids).map((id) =>
          this.http.get<Item>(`${this.baseUrl}/item/${id}.json`)
        )
      ).pipe(
        map((items: Item[]) =>
          items.filter((item) => item?.time && item.time <= cutoffTimestamp)
        )
      );

    if (!this.storIdList || this.storIdList.length === 0) {
      return this.http
        .get<Array<number>>(`${this.baseUrl}/topstories.json`)
        .pipe(
          tap((ids) => (this.storIdList = ids)), // cache ids
          switchMap((ids) => fetchItems(ids))
        );
    } else {
      return fetchItems(this.storIdList);
    }
  }

  private getLastMidnightUnix(): number {
    const now = new Date();
    const midnight = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );

    return Math.floor(midnight.getTime() / 1000);
  }

  public maxitem(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/maxitem.json`);
  }
}
