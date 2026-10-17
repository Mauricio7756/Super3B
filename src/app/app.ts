import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Inicio } from './components/inicio/inicio';
import { Informacion } from './components/informacion/informacion';
import { Catalogo } from './catalogo/catalogo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, Inicio, Catalogo, Informacion],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
