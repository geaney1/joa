import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of, switchMap, tap } from 'rxjs';
import Item from '../models/Item';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HackerNewsService {
  public maxFetchCount: number = 20;
  private topIdStoryList: number[] = [];
  private newIdStoryList: number[] = [];
  private askIdStoryList: number[] = [];
  private jobIdStoryList: number[] = [];
  private showIdStoryList: number[] = [];
  private readonly baseUrl: string = 'https://hacker-news.firebaseio.com/v0';

  constructor(private http: HttpClient) {}

  public topstories(page: number): Observable<Array<Item>> {
    const start = Math.max(0, (page - 1) * this.maxFetchCount);

    // Helper: slice the story IDs for the requested page
    const sliceIds = (ids: number[]) =>
      ids.slice(start, Math.min(start + this.maxFetchCount, ids.length));

    const fetchItems = (ids: number[]) =>
      forkJoin(
        sliceIds(ids).map((id) =>
          this.http.get<Item>(`${this.baseUrl}/item/${id}.json`)
        )
      );

    if (!this.topIdStoryList || this.topIdStoryList.length === 0) {
      return this.http
        .get<Array<number>>(`${this.baseUrl}/topstories.json`)
        .pipe(
          tap((ids) => (this.topIdStoryList = ids)), // cache ids
          switchMap((ids) => fetchItems(ids))
        );
    } else {
      return fetchItems(this.topIdStoryList);
    }
  }

  public newstories(page: number): Observable<Array<Item>> {
    const start = Math.max(0, (page - 1) * this.maxFetchCount);

    // Helper: slice the story IDs for the requested page
    const sliceIds = (ids: number[]) =>
      ids.slice(start, Math.min(start + this.maxFetchCount, ids.length));

    const fetchItems = (ids: number[]) =>
      forkJoin(
        sliceIds(ids).map((id) =>
          this.http.get<Item>(`${this.baseUrl}/item/${id}.json`)
        )
      );

    if (!this.newIdStoryList || this.newIdStoryList.length === 0) {
      return this.http
        .get<Array<number>>(`${this.baseUrl}/newstories.json`)
        .pipe(
          tap((ids) => (this.newIdStoryList = ids)), // cache ids
          switchMap((ids) => fetchItems(ids))
        );
    } else {
      return fetchItems(this.newIdStoryList);
    }
  }

  public askstories(page: number): Observable<Array<Item>> {
    const start = Math.max(0, (page - 1) * this.maxFetchCount);

    // Helper: slice the story IDs for the requested page
    const sliceIds = (ids: number[]) =>
      ids.slice(start, Math.min(start + this.maxFetchCount, ids.length));

    const fetchItems = (ids: number[]) =>
      forkJoin(
        sliceIds(ids).map((id) =>
          this.http.get<Item>(`${this.baseUrl}/item/${id}.json`)
        )
      );

    if (!this.askIdStoryList || this.askIdStoryList.length === 0) {
      return this.http
        .get<Array<number>>(`${this.baseUrl}/askstories.json`)
        .pipe(
          tap((ids) => (this.askIdStoryList = ids)), // cache ids
          switchMap((ids) => fetchItems(ids))
        );
    } else {
      return fetchItems(this.askIdStoryList);
    }
  }

  public jobstories(page: number): Observable<Array<Item>> {
    const start = Math.max(0, (page - 1) * this.maxFetchCount);

    // Helper: slice the story IDs for the requested page
    const sliceIds = (ids: number[]) =>
      ids.slice(start, Math.min(start + this.maxFetchCount, ids.length));

    const fetchItems = (ids: number[]) =>
      forkJoin(
        sliceIds(ids).map((id) =>
          this.http.get<Item>(`${this.baseUrl}/item/${id}.json`)
        )
      );

    if (!this.jobIdStoryList || this.jobIdStoryList.length === 0) {
      return this.http
        .get<Array<number>>(`${this.baseUrl}/jobstories.json`)
        .pipe(
          tap((ids) => (this.jobIdStoryList = ids)), // cache ids
          switchMap((ids) => fetchItems(ids))
        );
    } else {
      return fetchItems(this.jobIdStoryList);
    }
  }

  public showstories(page: number): Observable<Array<Item>> {
    const start = Math.max(0, (page - 1) * this.maxFetchCount);

    // Helper: slice the story IDs for the requested page
    const sliceIds = (ids: number[]) =>
      ids.slice(start, Math.min(start + this.maxFetchCount, ids.length));

    const fetchItems = (ids: number[]) =>
      forkJoin(
        sliceIds(ids).map((id) =>
          this.http.get<Item>(`${this.baseUrl}/item/${id}.json`)
        )
      );

    if (!this.showIdStoryList || this.showIdStoryList.length === 0) {
      return this.http
        .get<Array<number>>(`${this.baseUrl}/showstories.json`)
        .pipe(
          tap((ids) => (this.showIdStoryList = ids)), // cache ids
          switchMap((ids) => fetchItems(ids))
        );
    } else {
      return fetchItems(this.showIdStoryList);
    }
  }

  public paststories(page: number, daysAgo: number): Observable<Array<Item>> {
    const start = Math.max(0, (page - 1) * this.maxFetchCount * 2);

    const cutoffTimestamp = this.getLastMidnightUnix();

    // Helper: slice the story IDs for the requested page
    const sliceIds = (ids: number[]) =>
      ids.slice(start, Math.min(start + this.maxFetchCount * 2, ids.length));

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

    return this.http
      .get<Array<number>>(`${this.baseUrl}/topstories.json`)
      .pipe(switchMap((ids) => fetchItems(ids)));
  }

  private getLastMidnightUnix(): number {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.floor(midnight.getTime() / 1000);
  }

  public maxitem(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/maxitem.json`);
  }
}
