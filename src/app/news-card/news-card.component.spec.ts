import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsCardComponent } from './news-card.component';
import { DatePipe } from '@angular/common';

describe('NewsCardComponent', () => {
  let component: NewsCardComponent;
  let fixture: ComponentFixture<NewsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewsCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should compute identiconUrl based on id', () => {
    component.id = 123456;
    expect(component.identiconUrl).toBe('assets/image6.png');
  });

  it('should set posted date from Unix timestamp', () => {
    const unixTime = 1700000000; // example timestamp
    component.time = unixTime;
    component.ngOnInit();
    expect(component.posted).toEqual(new Date(unixTime * 1000));
  });

  it('should not set posted if time is undefined', () => {
    component.time = undefined;
    component.ngOnInit();
    expect(component.posted).toBeUndefined();
  });

  it('should handle url parsing gracefully', () => {
    component.url = 'https://example.com/news/article';
    expect(() => component.ngOnInit()).not.toThrow();
  });
});
