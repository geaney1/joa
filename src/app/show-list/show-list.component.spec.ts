import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ShowListComponent } from './show-list.component';
import { HackerNewsService } from '../services/hacker-news.service';
import Item from '../models/Item';

const mockItems: Item[] = [
  { id: 1, title: 'Show Story 1', type: 'story' },
  { id: 2, title: 'Show Story 2', type: 'story' },
];

describe('ShowListComponent', () => {
  let component: ShowListComponent;
  let fixture: ComponentFixture<ShowListComponent>;
  let mockNewsService: jest.Mocked<HackerNewsService>;

  beforeEach(async () => {
    mockNewsService = {
      showstories: jest.fn().mockReturnValue(of(mockItems)),
    } as unknown as jest.Mocked<HackerNewsService>;

    await TestBed.configureTestingModule({
      imports: [ShowListComponent],
      providers: [{ provide: HackerNewsService, useValue: mockNewsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch show stories on init', () => {
    expect(mockNewsService.showstories).toHaveBeenCalledWith(1);
    expect(component.stories.length).toBe(2);
    expect(component.stories[0].title).toBe('Show Story 1');
  });

  it('should load next page and fetch new stories', () => {
    mockNewsService.showstories.mockReturnValue(of([{ id: 3, title: 'Show Story 3', type: 'story' }]));
    component.loadNextPage();
    expect(component.currentPage).toBe(2);
    expect(mockNewsService.showstories).toHaveBeenCalledWith(2);
    expect(component.stories.length).toBe(1);
    expect(component.stories[0].title).toBe('Show Story 3');
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
