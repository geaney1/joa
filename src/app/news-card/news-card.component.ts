import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Item } from '../models/Item';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.css',
})
export class NewsCardComponent implements OnInit {
  @Input() cnt = 0;
  @Input() by?: string;
  @Input() descendants?: number;
  @Input() id = 0;
  @Input() kids?: number[];
  @Input() score?: number;
  @Input() time?: number;
  @Input() title?: string;
  @Input() type?: string;
  @Input() url?: string;
  @Input() parent?: number;
  @Input() text?: number;
  @Input() poll?: number;
  @Input() alreadyAdded?: boolean;

  public domain: string | undefined;
  public posted: Date | undefined;

  public readonly JOB = 'job';
  public readonly STORY = 'story';
  public readonly COMMENT = 'comment';
  public readonly POLL = 'poll';
  public readonly POLLOPT = 'pollopt';
  public readonly ASK = 'ask';


  public get identiconUrl(): string {
    const lastDigit = (this.id % 10).toString();
    return 'assets/image' + lastDigit + '.png';
  }

  public ngOnInit(): void {
    if (this.time) {
      this.posted = new Date(this.time * 1000);
    }

    if (this.url) {
      try {
        const match = /\/\/(.*?)\//.exec(this.url);
        if (match && match[1]) {
          this.domain = match[1];
        } else {
          // fallback: strip protocol (http:// or https://) and take host
          this.domain = this.url.replace(/(^\w+:|^)\/\//, '').split('/')[0];
        }
      } catch {
        // fallback: strip protocol (http:// or https://) and take host
        this.domain = this.url.replace(/(^\w+:|^)\/\//, '').split('/')[0];
      }
    }
  }
  
trackById(index: number, item: Item): number {
  return item.id;
}
}
