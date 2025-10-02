import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HackerNewsListComponent } from './hacker-news-list.component';
import { HackerNewsService } from '../services/hacker-news.service';  
import { of } from 'rxjs';
import Item from '../models/Item';
import { NewsCardComponent } from '../news-card/news-card.component';

describe('HackerNewsListComponent', () => {
  let component: HackerNewsListComponent;
  let fixture: ComponentFixture<HackerNewsListComponent>;
  let mockService: jasmine.SpyObj<HackerNewsService>;

  const mockStories: Item[] = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    title: `Story ${i}`,
    url: `https://example.com/story${i}`,
    by: `user${i}`,
    time: Date.now(),
    score: i * 10,
    descendants: i,
    type: 'story', // Add the required 'type' property
  }));

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('HackerNewsService', ['topstories']);
    mockService.topstories.and.returnValue(of(mockStories));

    await TestBed.configureTestingModule({
      imports: [HackerNewsListComponent, NewsCardComponent],
      providers: [{ provide: HackerNewsService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HackerNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with title "Hacker News"', () => {
    expect(component.title).toBe('Hacker News');
  });

  it('should fetch stories on init', () => {
    expect(mockService.topstories).toHaveBeenCalledWith(1);
    expect(component.stories.length).toBe(20);
  });


  it('should return true for lastPage if stories < 20', () => {
    component.stories = mockStories.slice(0, 1);
    expect(component.lastPage()).toBeTrue();
  });

  it('should return false for lastPage if stories === 20', () => {
    component.stories =Array(20).fill({
      id: 0,
      title: '',
      by: '',
      time: 0,
      url: '',
    });
    expect(component.lastPage()).toBeFalse();
  });

  it('should calculate correct counter value', () => {
    component.currentPage = 3;
    expect(component.getCounter(0)).toBe(40);
    expect(component.getCounter(5)).toBe(45);
  });
});
