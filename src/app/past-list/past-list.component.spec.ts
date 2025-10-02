import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PastListComponent } from './past-list.component';
import { HackerNewsService } from '../services/hacker-news.service';
import { of } from 'rxjs';
import Item from '../models/Item';

describe('PastListComponent', () => {
  let component: PastListComponent;
  let fixture: ComponentFixture<PastListComponent>;
  let mockService: jasmine.SpyObj<HackerNewsService>;

  const mockStories: Item[] = [
    {
      id: 1,
      title: 'Story 1',
      by: 'user1',
      time: 123456,
      url: 'http://example.com/1',
      type: 'story',
    },
    {
      id: 2,
      title: 'Story 2',
      by: 'user2',
      time: 123457,
      url: 'http://example.com/2',
      type: 'story',
    },
  ];

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('HackerNewsService', ['askstories']);

    await TestBed.configureTestingModule({
      imports: [PastListComponent],
      providers: [{ provide: HackerNewsService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PastListComponent);
    component = fixture.componentInstance;
  });


  it('should return true for lastPage if stories < 20', () => {
    component.stories = mockStories;
    expect(component.lastPage()).toBeTrue();
  });

  it('should return false for lastPage if stories >= 20', () => {
    component.stories = Array(20).fill({
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
    expect(component.getCounter(5)).toBe(46); // (3 - 1) * 20 + 5
  });
});
