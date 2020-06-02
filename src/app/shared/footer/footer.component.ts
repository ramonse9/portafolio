import { Component, OnInit } from '@angular/core';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  anio: number = new Date().getFullYear();

  constructor(public _servicio: InfoPaginaService,
              public _servicioProductos: ProductosService) {               
   }

  ngOnInit(): void {
  }

}
