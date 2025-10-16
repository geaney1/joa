import { Routes } from '@angular/router';
import { HackerNewsListComponent } from './hacker-news-list/hacker-news-list.component';


export const routes: Routes = [
    { path: '', redirectTo: 'hackernews/topstories', pathMatch: 'full' },
    { path:'hackernews/:storytype', component: HackerNewsListComponent }
];
