import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewListComponent } from './new-list.component';
import { provideHttpClient } from '@angular/common/http';
import { HackerNewsService } from '../services/hacker-news.service';

describe('NewListComponent', () => {
  let fixture: ComponentFixture<NewListComponent>;
  let component: NewListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewListComponent], // standalone component
      providers: [
        provideHttpClient(), // Angular 15+ functional provider
        HackerNewsService, // if not provided in root
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('NewListComponent', () => {
  let component: NewListComponent;
  let fixture: ComponentFixture<NewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
