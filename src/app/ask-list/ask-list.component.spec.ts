import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AskListComponent } from './ask-list.component';
import { HackerNewsService } from '../services/hacker-news.service';
import { NewsCardComponent } from '../news-card/news-card.component';
import { of } from 'rxjs';
import Item from '../models/Item';

describe('AskListComponent', () => {
  let component: AskListComponent;
  let fixture: ComponentFixture<AskListComponent>;
  let mockService: jasmine.SpyObj<HackerNewsService>;

  const mockStories: Item[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Story ${i + 1}`,
    by: `user${i + 1}`,
    time: Date.now(),
    score: i * 10,
    descendants: i,
    url: `https://example.com/story${i + 1}`,
    type: 'story',
  }));

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('HackerNewsService', ['askstories']);
    mockService.askstories.and.returnValue(of(mockStories));

    await TestBed.configureTestingModule({
      imports: [AskListComponent, NewsCardComponent],
      providers: [{ provide: HackerNewsService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should initialize with title and fetch first page', () => {
    expect(component.title).toBe('Asked Stories');
    expect(component.currentPage).toBe(1);
    expect(mockService.askstories).toHaveBeenCalledWith(1);
    expect(component.stories.length).toBe(20);
  });
  
  it('should return true for lastPage if stories < 20', () => {
    component.stories = mockStories.slice(0, 1);
    expect(component.lastPage()).toBeTrue();
  });

  it('should return false for lastPage if stories == 20', () => {
    component.stories = Array(20).fill({
      id: 0,
      title: '',
      by: '',
      time: 0,
      url: '',
    });
    expect(component.lastPage()).toBeFalse();
  });

  it('should calculate correct counter index', () => {
    component.currentPage = 1;
    expect(component.getCounter(5)).toBe(5);

    component.currentPage = 3;
    expect(component.getCounter(5)).toBe(45); // (3 - 1) * 20 + 5
  });
});
