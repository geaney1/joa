import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsCardComponent } from './news-card.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewsCardComponent', () => {
  let component: NewsCardComponent;
  let fixture: ComponentFixture<NewsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsCardComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NewsCardComponent);
    component = fixture.componentInstance;
  });


  it('should convert Unix timestamp to Date object', () => {
    const timestamp = 1696100000; // Example timestamp
    component.time = timestamp;
    component.ngOnInit();
    expect(component.posted).toEqual(new Date(timestamp * 1000));
  });

  it('should extract domain from a valid URL', () => {
    component.url = 'https://example.com/page';
    component.ngOnInit();
    expect(component.domain).toBe('example.com');
  });

  it('should fallback to slicing URL if domain extraction fails', () => {
    component.url = 'https://example.com';
    spyOn(RegExp.prototype, 'exec').and.throwError('RegExp failed');
    component.ngOnInit();
    expect(component.domain).toBe('example.com');
  });

  it('should generate identiconUrl based on id', () => {
    component.id = 123456;
    const expected = 'https://github.com/identicons/1234.png';
    expect(component.identiconUrl).toBe(expected);
  });

  it('should default inputs correctly', () => {
    expect(component.cnt).toBe(0);
    expect(component.id).toBe(0);
  });
});
