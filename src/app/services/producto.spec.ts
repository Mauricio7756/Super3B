import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Producto, ProductoService } from './producto';

describe('ProductoService', () => {
  let service: ProductoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('requests grocery products and adapts the API response', () => {
    const expectedProducts: Producto[] = [
      {
        id: 1,
        title: 'Manzanas',
        price: 4.99,
        description: 'Manzanas frescas.',
        category: 'Supermercado',
        image: 'https://example.com/product.png',
        rating: 4.5,
      },
    ];

    service.obtenerProductos().subscribe((products) => {
      expect(products).toEqual(expectedProducts);
    });

    const request = httpTestingController.expectOne(
      'https://dummyjson.com/products/category/groceries?limit=12',
    );
    expect(request.request.method).toBe('GET');
    request.flush({
      products: [
        {
          id: 1,
          title: 'Manzanas',
          price: 4.99,
          description: 'Manzanas frescas.',
          category: 'groceries',
          thumbnail: 'https://example.com/product.png',
          rating: 4.5,
        },
      ],
      total: 1,
      skip: 0,
      limit: 12,
    });
  });
});
