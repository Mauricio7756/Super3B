import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Producto {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
}

interface RespuestaProductos {
  products: Array<Omit<Producto, 'image'> & { thumbnail: string }>;
}

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private http = inject(HttpClient);

  private apiUrl = 'https://dummyjson.com/products/category/groceries?limit=12';

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<RespuestaProductos>(this.apiUrl).pipe(
      map(({ products }) =>
        products.map(({ thumbnail, ...producto }) => ({
          ...producto,
          image: thumbnail,
          category: 'Supermercado',
        })),
      ),
    );
  }
}
