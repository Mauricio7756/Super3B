import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Producto, ProductoService } from '../services/producto';

import { Catalogo } from './catalogo';

describe('Catalogo', () => {
  let component: Catalogo;
  let fixture: ComponentFixture<Catalogo>;
  const productos: Producto[] = [
    {
      id: 1,
      title: 'Manzanas',
      price: 4.99,
      description: 'Producto para validar el catálogo.',
      category: 'Supermercado',
      image: 'https://example.com/product.png',
      rating: 4.5,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Catalogo],
      providers: [
        {
          provide: ProductoService,
          useValue: { obtenerProductos: () => of(productos) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Catalogo);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders products returned by the API', () => {
    expect(component.cargando()).toBe(false);
    expect(fixture.nativeElement.querySelector('.estado')).toBeNull();
    expect(fixture.nativeElement.querySelector('.error')).toBeNull();
    expect(fixture.nativeElement.querySelector('.producto h2')?.textContent).toContain(
      'Manzanas',
    );
    expect(fixture.nativeElement.querySelector('.producto .categoria')?.textContent).toContain(
      'Supermercado',
    );
  });
});
