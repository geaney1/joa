import { Routes } from '@angular/router';
import { AskListComponent } from './ask-list/ask-list.component';
import { HackerNewsListComponent } from './hacker-news-list/hacker-news-list.component';
import { NewListComponent } from './new-list/new-list.component';
import { PastListComponent } from './past-list/past-list.component';
import { ShowListComponent } from './show-list/show-list.component';
import { JobListComponent } from './job-list/job-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'hackernews', pathMatch: 'full' },
    { path: 'hackernews', component: HackerNewsListComponent },
    { path: 'new', component: NewListComponent },
    { path: 'past', component: PastListComponent },
    { path: 'ask', component: AskListComponent },
    { path: 'job', component: JobListComponent },
    { path: 'show', component: ShowListComponent }
];
