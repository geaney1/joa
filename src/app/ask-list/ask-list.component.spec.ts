import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HackerNewsService } from '../services/hacker-news.service';
import Item from '../models/Item';
import { AskListComponent } from './ask-list.component';

const mockItems2: Item[] = [
  { id: 1, title: 'ask story 1', type: 'story' },
  { id: 2, title: 'ask story 2', type: 'story' },
];

const mockItems20: Item[] = [
  { id: 1, title: 'ask story 1', type: 'story' },
  { id: 2, title: 'ask story 2', type: 'story' },
  { id: 3, title: 'ask story 3', type: 'story' },
  { id: 4, title: 'ask story 4', type: 'story' },
  { id: 5, title: 'ask story 5', type: 'story' },
  { id: 6, title: 'ask story 6', type: 'story' },
  { id: 7, title: 'ask story 7', type: 'story' },
  { id: 8, title: 'ask story 8', type: 'story' },
  { id: 9, title: 'ask story 9', type: 'story' },
  { id: 10, title: 'ask story 10', type: 'story' },
  { id: 11, title: 'ask story 11', type: 'story' },
  { id: 12, title: 'ask story 12', type: 'story' },
  { id: 13, title: 'ask story 13', type: 'story' },
  { id: 14, title: 'ask story 14', type: 'story' },
  { id: 15, title: 'ask story 15', type: 'story' },
  { id: 16, title: 'ask story 16', type: 'story' },
  { id: 17, title: 'ask story 17', type: 'story' },
  { id: 18, title: 'ask story 18', type: 'story' },
  { id: 19, title: 'ask story 19', type: 'story' },
  { id: 20, title: 'ask story 20', type: 'story' },
];

describe('AskListComponent', () => {
  let component: AskListComponent;
  let fixture: ComponentFixture<AskListComponent>;
  let mockNewsService: jest.Mocked<HackerNewsService>;

  beforeEach(async () => {
    mockNewsService = {
      askstories: jest.fn().mockReturnValue(of(mockItems2)),
    } as unknown as jest.Mocked<HackerNewsService>;

    await TestBed.configureTestingModule({
      imports: [AskListComponent], // ✅ standalone components go here
      providers: [{ provide: HackerNewsService, useValue: mockNewsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load ask stories from the service', () => {
    mockNewsService.askstories.mockReturnValue(of(mockItems20));
    component.loadNextPage();
    expect(component.currentPage).toBe(2);
    expect(mockNewsService.askstories).toHaveBeenCalledWith(2);
    expect(component.stories.length).toBe(20);
    expect(component.stories[0].title).toBe('ask story 1');
  });
});
