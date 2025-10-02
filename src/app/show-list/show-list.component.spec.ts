import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowListComponent } from './show-list.component';
import { HackerNewsService } from '../services/hacker-news.service';
import { of } from 'rxjs';
import Item from '../models/Item';

describe('ShowListComponent', () => {
  let component: ShowListComponent;
  let fixture: ComponentFixture<ShowListComponent>;
  let mockService: jasmine.SpyObj<HackerNewsService>;

  const mockStories: Item[] = [
    {
      id: 1,
      title: 'Story 1',
      url: 'https://example.com/1',
      type: 'story',
    },
    {
      id: 2,
      title: 'Story 2',
      url: 'https://example.com/2',
      type: 'story',
    },
    // Add more mock items if needed
  ];

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('HackerNewsService', ['showstories']);

    await TestBed.configureTestingModule({
      imports: [ShowListComponent],
      providers: [{ provide: HackerNewsService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowListComponent);
    component = fixture.componentInstance;
  });

  it('should return true for lastPage if fewer than 20 stories', () => {
    component.stories = mockStories;
    expect(component.lastPage()).toBeTrue();
  });

  it('should return false for lastPage if 20 or more stories', () => {
    component.stories = Array(20).fill({ id: 0, title: '', url: '' });
    expect(component.lastPage()).toBeFalse();
  });

  it('should calculate correct counter value', () => {
    component.currentPage = 3;
    expect(component.getCounter(0)).toBe(40);
    expect(component.getCounter(5)).toBe(45);
  });
});
