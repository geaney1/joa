import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, forkJoin, map } from "rxjs";
import Item from "../models/Item";

@Injectable({ providedIn: 'root' })
export class ItemService {
  private http = Inject(HttpClient);

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`/api/item/${id}`);
  }

  getItems(ids: number[]): Observable<Item[]> {
    return forkJoin(ids.map(id => this.getItem(id)));
  }

  getItemWithTransform(id: number): Observable<string> {
    return this.getItem(id).pipe(
      map(item => `${item.title} (${item.score})`)
    );
  }
}