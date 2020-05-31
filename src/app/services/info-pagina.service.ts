import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina-interface';
import { InfoEquipo } from '../interfaces/info-equipo-interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: InfoEquipo[];
 
  constructor(private http: HttpClient) {
      console.log("***SERVICIO info-pagina.service");      
      this.cargarInfo();
      this.cargarEquipo();
    }

    private cargarInfo(){
      // Leer el archivo JSON
      this.http.get('assets/data/data-pagina.json')
        .subscribe( (resp: InfoPagina) => {
        // console.log( resp );
        this.cargada = true;
        this.info = resp;
        console.log( resp );
        // console.log( resp['twitter'] );
        // console.log( resp['email']);
      });
    }

    private cargarEquipo(){
      // Leer archivo desde FireBase
      this.http.get('https://angular-html-95ccd.firebaseio.com/equipo.json')
        .subscribe( (resp: InfoEquipo[])  => {
          console.log( resp );
          //this.equipo.push( resp );
          this.equipo = resp;
        });
    }
}
