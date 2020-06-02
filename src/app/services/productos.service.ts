import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];
  filtroNotFound = false;

  constructor(private http: HttpClient){
    this.cargarProductos();
  }

  private cargarProductos(){

    return new Promise( (resolve, reject) => {
      this.http.get('https://angular-html-95ccd.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[] ) => {
        // console.log( resp );
         this.productos = resp;
        
        //setTimeout( () => {
          this.cargando = false;
        //}, 2000);
        resolve();
      });
    }); 
  }

  getProductos(id: string){
    return this.http.get(`https://angular-html-95ccd.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto( termino:string ){

    if(this.productos.length === 0){
      // cargar productos
      this.cargarProductos().then( () => {
        // ejecutar despues de tener los productos
        // aplicar el filtro
        this.filtrarProductos( termino );

      });

    }else{
      //aplicar el filtro
      this.filtrarProductos( termino);

    }
   
  }

  private filtrarProductos(termino: string){
    
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();    

    //Programacion Funcional
    //return this.productos.filter(x => x.categoria.toLowerCase().includes(termino));

    this.productos.forEach( prod => {
      const tituloLowerCase = prod.titulo.toLocaleLowerCase();
      if( prod.categoria.indexOf(termino) >= 0 || tituloLowerCase.indexOf( termino) >= 0 ){
        this.productosFiltrado.push( prod );
      }
    });

    if(this.productosFiltrado.length > 0){
      this.filtroNotFound = false
    }else{
      this.filtroNotFound = true;
    }

  }  
}
