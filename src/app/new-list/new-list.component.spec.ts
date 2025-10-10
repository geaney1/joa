import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NewListComponent } from './new-list.component';
import { HackerNewsService } from '../services/hacker-news.service';
import Item from '../models/Item';

const mockItems: Item[] = [
  { id: 1, title: 'New Story 1', type: 'story' },
  { id: 2, title: 'New Story 2', type: 'story' },
];

describe('NewListComponent', () => {
  let component: NewListComponent;
  let fixture: ComponentFixture<NewListComponent>;
  let mockNewsService: jest.Mocked<HackerNewsService>;

  beforeEach(async () => {
    mockNewsService = {
      newstories: jest.fn().mockReturnValue(of(mockItems)),
    } as unknown as jest.Mocked<HackerNewsService>;

    await TestBed.configureTestingModule({
      imports: [NewListComponent],
      providers: [{ provide: HackerNewsService, useValue: mockNewsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(NewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch new stories on init', () => {
    expect(mockNewsService.newstories).toHaveBeenCalledWith(1);
    expect(component.stories.length).toBe(2);
    expect(component.stories[0].title).toBe('New Story 1');
  });

  it('should load next page and fetch new stories', () => {
    mockNewsService.newstories.mockReturnValue(of([{ id: 3, title: 'New Story 3', type: 'story' }]));
    component.loadNextPage();
    expect(component.currentPage).toBe(2);
    expect(mockNewsService.newstories).toHaveBeenCalledWith(2);
    expect(component.stories.length).toBe(1);
    expect(component.stories[0].title).toBe('New Story 3');
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
