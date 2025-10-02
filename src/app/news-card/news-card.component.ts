import { Component, Input, OnInit } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.css',
})
export class NewsCardComponent implements OnInit {
  @Input() cnt: number = 0;
  @Input() by?: string;
  @Input() descendants?: number;
  @Input() id: number = 0;
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
  public addedToReadLater: boolean | undefined;

  public readonly JOB = 'job';
  public readonly STORY = 'story';
  public readonly COMMENT = 'comment';
  public readonly POLL = 'poll';
  public readonly POLLOPT = 'pollopt';
  public readonly ASK = 'ask';

  public constructor() {}

  public get identiconUrl(): string {
    const strId = String(this.id);
    return `https://github.com/identicons/${strId.slice(0, 4)}.png`;
  }

  public ngOnInit(): void {
    if (this.alreadyAdded) {
      this.addedToReadLater = true;
    }

    if (this.time) {
      this.posted = new Date(this.time * 1000);
    }

    if (this.url) {
      try {
        //@ts-ignore
        const [_, domain] = /\/\/(.*?)\//.exec(this.url);
        this.domain = domain;
      } catch {
        // default to https check. TODO need check for http too
        this.domain = this.url.slice(8);
      }
    }
  }
}
