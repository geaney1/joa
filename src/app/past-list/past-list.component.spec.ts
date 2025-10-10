import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PastListComponent } from './past-list.component';
import { HackerNewsService } from '../services/hacker-news.service';
import Item from '../models/Item';

const mockItems2: Item[] = [
  { id: 1, title: 'past story 1', type: 'story' },
  { id: 2, title: 'past story 2', type: 'story' },
];
const mockItems20: Item[] = [
  { id: 1, title: 'past story 1', type: 'story' },
  { id: 2, title: 'past story 2', type: 'story' },
  { id: 3, title: 'past story 3', type: 'story' },
  { id: 4, title: 'past story 4', type: 'story' },
  { id: 5, title: 'past story 5', type: 'story' },
  { id: 6, title: 'past story 6', type: 'story' },
  { id: 7, title: 'past story 7', type: 'story' },
  { id: 8, title: 'past story 8', type: 'story' },
  { id: 9, title: 'past story 9', type: 'story' },
  { id: 10, title: 'past story 10', type: 'story' },
  { id: 11, title: 'past story 11', type: 'story' },
  { id: 12, title: 'past story 12', type: 'story' },
  { id: 13, title: 'past story 13', type: 'story' },
  { id: 14, title: 'past story 14', type: 'story' },
  { id: 15, title: 'past story 15', type: 'story' },
  { id: 16, title: 'past story 16', type: 'story' },
  { id: 17, title: 'past story 17', type: 'story' },
  { id: 18, title: 'past story 18', type: 'story' },
  { id: 19, title: 'past story 19', type: 'story' },
  { id: 20, title: 'past story 20', type: 'story' },
];

describe('PastListComponent', () => {
  let component: PastListComponent;
  let fixture: ComponentFixture<PastListComponent>;
  let mockNewsService: jest.Mocked<HackerNewsService>;

  beforeEach(async () => {
    mockNewsService = {
      paststories: jest.fn().mockReturnValue(of(mockItems2)),
    } as unknown as jest.Mocked<HackerNewsService>;

    await TestBed.configureTestingModule({
      imports: [PastListComponent],
      providers: [{ provide: HackerNewsService, useValue: mockNewsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PastListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch past stories on init', () => {
    expect(mockNewsService.paststories).toHaveBeenCalledWith(1, 1);
    expect(component.stories.length).toBe(2);
    expect(component.stories[0].title).toBe('past story 1');
  });

  it('should load next page and fetch past stories', () => {
    mockNewsService.paststories.mockReturnValue(of(mockItems20));
    component.loadNextPage();
    expect(component.currentPage).toBe(2);
    expect(mockNewsService.paststories).toHaveBeenCalledWith(2, 1);
    expect(component.stories.length).toBe(20);
    expect(component.stories[0].title).toBe('past story 1');
  });

  it('should return true for lastPage if 0 stories', () => {
    mockNewsService.paststories.mockReturnValue(of([]));
    component.loadNextPage();
    expect(component.currentPage).toBe(2);
    expect(component.lastPage()).toBe(true);
  });

  it('should calculate correct counter value', () => {
    component.currentPage = 1;
    expect(component.getCounter(2)).toBe(2);
  });
});
