import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/Eventos/services/evento.service';
import { SeoModel, SeoService } from 'src/app/services/seo.service';
import { Escola, Evento } from '../modls_eventos/evento';


@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})
export class ListaEventosComponent implements OnInit {

  public eventos: Escola[];
  errorMessage: string;


  constructor(seoService: SeoService, private eventoService: EventoService){
   
    let seoModel: SeoModel = <SeoModel>{
      title: 'Escolas',
      description: "Escolas no brasil",
      robots: 'Index,Follow',
      keywords: 'escolas'
    };
  seoService.setSeoDate(seoModel);
  }
  async ngOnInit() {
    try {
      const eventos = await this.eventoService.obterTodos().toPromise();
      this.eventos = eventos as Escola[]; // Realizando a conversão para Escola[]
      //console.log('Objeto de retorno:', eventos);
    } catch (error) {
      
    }
  }
  
}
