import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HackerNewsListComponent } from './hacker-news-list.component';
import { HackerNewsService } from '../services/hacker-news.service';
import Item from '../models/Item';

const mockItems2: Item[] = [
  { id: 1, title: 'story 1', type: 'story' },
  { id: 2, title: 'story 2', type: 'story' },
];
const mockItems20: Item[] = [
  { id: 1, title: 'story 1', type: 'story' },
  { id: 2, title: 'story 2', type: 'story' },
  { id: 3, title: 'story 3', type: 'story' },
  { id: 4, title: 'story 4', type: 'story' },
  { id: 5, title: 'story 5', type: 'story' },
  { id: 6, title: 'story 6', type: 'story' },
  { id: 7, title: 'story 7', type: 'story' },
  { id: 8, title: 'story 8', type: 'story' },
  { id: 9, title: 'story 9', type: 'story' },
  { id: 10, title: 'story 10', type: 'story' },
  { id: 11, title: 'story 11', type: 'story' },
  { id: 12, title: 'story 12', type: 'story' },
  { id: 13, title: 'story 13', type: 'story' },
  { id: 14, title: 'story 14', type: 'story' },
  { id: 15, title: 'story 15', type: 'story' },
  { id: 16, title: 'story 16', type: 'story' },
  { id: 17, title: 'story 17', type: 'story' },
  { id: 18, title: 'story 18', type: 'story' },
  { id: 19, title: 'story 19', type: 'story' },
  { id: 20, title: 'story 20', type: 'story' },
];

describe('HackerNewsListComponent', () => {
  let component: HackerNewsListComponent;
  let fixture: ComponentFixture<HackerNewsListComponent>;
  let mockNewsService: jest.Mocked<HackerNewsService>;

  beforeEach(async () => {
    mockNewsService = {
      topstories: jest.fn().mockReturnValue(of(mockItems2)),
    } as unknown as jest.Mocked<HackerNewsService>;

    await TestBed.configureTestingModule({
      imports: [HackerNewsListComponent],
      providers: [{ provide: HackerNewsService, useValue: mockNewsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HackerNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch stories on init', () => {
    expect(mockNewsService.topstories).toHaveBeenCalledWith(1);
    expect(component.stories.length).toBe(2);
  });

  it('should load next page and fetch new stories', () => {
    mockNewsService.topstories.mockReturnValue(of(mockItems20));
    component.loadNextPage();
    expect(component.currentPage).toBe(2);
    expect(mockNewsService.topstories).toHaveBeenCalledWith(2);
    expect(component.stories.length).toBe(20);
    expect(component.stories[3].title).toBe('story 4');
  });

  it('should return true for lastPage if fewer than 20 stories', () => {
    expect(component.lastPage()).toBe(true);
  });

  it('should calculate correct counter value', () => {
    component.currentPage = 3;
    expect(component.getCounter(0)).toBe(40);
    expect(component.getCounter(5)).toBe(45);
  });
});
