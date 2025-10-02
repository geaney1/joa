import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobListComponent } from './job-list.component';
import { HackerNewsService } from '../services/hacker-news.service';
import { of } from 'rxjs';
import Item from '../models/Item';

describe('JobListComponent', () => {
  let component: JobListComponent;
  let fixture: ComponentFixture<JobListComponent>;
  let mockService: jasmine.SpyObj<HackerNewsService>;

  const mockStories: Item[] = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    title: `Job ${i}`,
    url: `https://example.com/job/${i}`,
    by: `user${i}`,
    time: Date.now(),
    score: i,
    descendants: 0,
    type: 'job',
  }));

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('HackerNewsService', ['jobstories']);
    mockService.jobstories.and.returnValue(of(mockStories));

    await TestBed.configureTestingModule({
      imports: [JobListComponent],
      providers: [{ provide: HackerNewsService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(JobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with title "Jobs"', () => {
    expect(component.title).toBe('Jobs');
  });

  it('should fetch initial data on construction', () => {
    expect(mockService.jobstories).toHaveBeenCalledWith(1);
    expect(component.stories.length).toBe(20);
  });

  it('should load next page and increment currentPage', () => {
    mockService.jobstories.and.returnValue(of(mockStories));
    component.loadNextPage();
    expect(component.currentPage).toBe(2);
    expect(mockService.jobstories).toHaveBeenCalledWith(2);
    expect(component.stories.length).toBe(20);
  });

  it('should return true for lastPage if stories < 20', () => {
    component.stories = mockStories.slice(0, 1);
    expect(component.lastPage()).toBeTrue();
  });

  it('should return false for lastPage if stories === 20', () => {
    component.stories = Array(21).fill({
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
