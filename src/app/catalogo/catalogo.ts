import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductoService, Producto } from '../services/producto';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {
  private productoService = inject(ProductoService);

  productos = signal<Producto[]>([]);
  cargando = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (productos) => {
        this.productos.set(productos);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al consultar productos:', err);
        this.error.set('No fue posible cargar los productos. Intenta nuevamente.');
        this.cargando.set(false);
      },
    });
  }
}
