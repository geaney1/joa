import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { JobListComponent } from './job-list.component';
import { HackerNewsService } from '../services/hacker-news.service';
import Item from '../models/Item';

const mockItems2: Item[] = [
  { id: 1, title: 'Job 1', type: 'job' },
  { id: 2, title: 'Job 2', type: 'job' },
];
const mockItems20: Item[] = [
  { id: 1, title: 'Job 1', type: 'job' },
  { id: 2, title: 'Job 2', type: 'job' },
  { id: 3, title: 'Job 3', type: 'job' },
  { id: 4, title: 'Job 4', type: 'job' },
  { id: 5, title: 'Job 5', type: 'job' },
  { id: 6, title: 'Job 6', type: 'job' },
  { id: 7, title: 'Job 7', type: 'job' },
  { id: 8, title: 'Job 8', type: 'job' },
  { id: 9, title: 'Job 9', type: 'job' },
  { id: 10, title: 'Job 10', type: 'job' },
  { id: 11, title: 'Job 11', type: 'job' },
  { id: 12, title: 'Job 12', type: 'job' },
  { id: 13, title: 'Job 13', type: 'job' },
  { id: 14, title: 'Job 14', type: 'job' },
  { id: 15, title: 'Job 15', type: 'job' },
  { id: 16, title: 'Job 16', type: 'job' },
  { id: 17, title: 'Job 17', type: 'job' },
  { id: 18, title: 'Job 18', type: 'job' },
  { id: 19, title: 'Job 19', type: 'job' },
  { id: 20, title: 'Job 20', type: 'job' },
];

describe('JobListComponent', () => {
  let component: JobListComponent;
  let fixture: ComponentFixture<JobListComponent>;
  let mockNewsService: jest.Mocked<HackerNewsService>;

  beforeEach(async () => {
    mockNewsService = {
      jobstories: jest.fn().mockReturnValue(of(mockItems2)),
    } as unknown as jest.Mocked<HackerNewsService>;

    await TestBed.configureTestingModule({
      imports: [JobListComponent],
      providers: [{ provide: HackerNewsService, useValue: mockNewsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(JobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch job stories on init', () => {
    expect(mockNewsService.jobstories).toHaveBeenCalledWith(1);
    expect(component.stories.length).toBe(2);
    expect(component.stories[0].title).toBe('Job 1');
  });

  it('should load next page and fetch new stories', () => {
    mockNewsService.jobstories.mockReturnValue(of(mockItems20));
    expect(component.currentPage).toBe(1);
    component.loadNextPage();
    expect(component.currentPage).toBe(2);
    expect(mockNewsService.jobstories).toHaveBeenCalledWith(2);
    expect(component.stories.length).toBe(20);
    expect(component.stories[0].title).toBe('Job 1');
  });

  it('should return true for lastPage if fewer than 20 stories', () => {
    expect(component.currentPage).toBe(1);
    expect(component.lastPage()).toBe(true);
  });

  it('should calculate correct counter value', () => {
    component.currentPage = 3;
    expect(component.getCounter(0)).toBe(40);
    expect(component.getCounter(5)).toBe(45);
  });
});
