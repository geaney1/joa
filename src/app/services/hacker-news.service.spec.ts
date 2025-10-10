import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ItemService } from './item.service';
import Item from '../models/Item';

describe('ItemService', () => {
  let service: ItemService;
  let httpMock: HttpTestingController;

  const mockItem: Item = { id: 1, title: 'Test', score: 42 };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemService],
    });

    service = TestBed.inject(ItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch a single item', () => {
    service.getItem(1).subscribe(item => {
      expect(item).toEqual(mockItem);
    });

    const req = httpMock.expectOne('/api/item/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockItem);
  });

  it('should fetch multiple items using forkJoin', () => {
    const mockItems: Item[] = [
      { id: 1, title: 'One', score: 10 },
      { id: 2, title: 'Two', score: 20 },
    ];

    service.getItems([1, 2]).subscribe(items => {
      expect(items).toEqual(mockItems);
    });

    httpMock.expectOne('/api/item/1').flush(mockItems[0]);
    httpMock.expectOne('/api/item/2').flush(mockItems[1]);
  });

  it('should transform item into formatted string', () => {
    service.getItemWithTransform(1).subscribe(result => {
      expect(result).toBe('Test (42)');
    });

    const req = httpMock.expectOne('/api/item/1');
    req.flush(mockItem);
  });
});

