import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HackerNewsListComponent } from './hacker-news-list.component';
import { HackerNewsService } from '../services/hacker-news.service';
import {Item} from '../models/Item';
import { provideRouter } from '@angular/router';


const mockItems2: Item[] = [
  { id: 1, title: 'story 1', type: 'story', time: 1696118400 },
  { id: 2, title: 'story 2', type: 'story', time: 1696118400 },
];
const mockItems20: Item[] = [
  { id: 1, title: 'story 1', type: 'story', time: 1696118400 },
  { id: 2, title: 'story 2', type: 'story', time: 1696118400 },
  { id: 3, title: 'story 3', type: 'story', time: 1696118400 },
  { id: 4, title: 'story 4', type: 'story', time: 1696118400 },
  { id: 5, title: 'story 5', type: 'story', time: 1696118400 },
  { id: 6, title: 'story 6', type: 'story', time: 1696118400  },
  { id: 7, title: 'story 7', type: 'story', time: 1696118400 },
  { id: 8, title: 'story 8', type: 'story', time: 1696118400 },
  { id: 9, title: 'story 9', type: 'story', time: 1696118400 },
  { id: 10, title: 'story 10', type: 'story', time: 1696118400 },
  { id: 11, title: 'story 11', type: 'story', time: 1696118400  },
  { id: 12, title: 'story 12', type: 'story', time: 1696118400 },
  { id: 13, title: 'story 13', type: 'story', time: 1696118400 },
  { id: 14, title: 'story 14', type: 'story', time: 1696118400 },
  { id: 15, title: 'story 15', type: 'story', time: 1696118400 },
  { id: 16, title: 'story 16', type: 'story', time: 1696118400 },
  { id: 17, title: 'story 17', type: 'story', time: 1696118400 },
  { id: 18, title: 'story 18', type: 'story', time: 1696118400 },
  { id: 19, title: 'story 19', type: 'story', time: 1696118400 },
  { id: 20, title: 'story 20', type: 'story', time: 1696118400 },
];

describe('HackerNewsListComponent', () => {
  let component: HackerNewsListComponent;
  let fixture: ComponentFixture<HackerNewsListComponent>;
  let mockNewsService: jest.Mocked<HackerNewsService>;

  beforeEach(async () => {
    mockNewsService = {
      getOtherStories: jest.fn().mockReturnValue(of(mockItems2)),
    } as unknown as jest.Mocked<HackerNewsService>;

    await TestBed.configureTestingModule({
      imports: [HackerNewsListComponent],
      providers: [provideRouter([]), { provide: HackerNewsService, useValue: mockNewsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HackerNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    component.storyType = 'topstories';
    expect(component).toBeTruthy();
  });

  it('should fetch stories on init', () => {
    component.storyType = 'topstories';
    component.fetchData(1);
    expect(mockNewsService.getOtherStories).toHaveBeenCalledWith(1, 'topstories', 20);
    expect(component.stories.length).toBe(2);
  });

  it('should load next page and fetch new stories', () => {
    mockNewsService.getOtherStories.mockReturnValue(of(mockItems20));
    component.storyType = 'topstories';
    component.loadNextPage();
    expect(component.currentPage).toBe(2);
    expect(mockNewsService.getOtherStories).toHaveBeenCalledWith(2, 'topstories', 20);
    expect(component.stories.length).toBe(20);
    expect(component.stories[3].title).toBe('story 4');
  });

  it('should return true for lastPage if fewer than 20 stories', () => {
    component.storyType = 'topstories';
    expect(component.lastPage()).toBe(true);
  });

  it('should calculate correct counter value', () => {
    component.storyType = 'topstories';
    component.itemCounter = 40;
    expect(component.getCounter(0)).toBe(40);
    expect(component.getCounter(5)).toBe(45);
  });
});
