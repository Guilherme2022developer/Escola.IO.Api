import { Component, OnInit } from '@angular/core';
import { SeoService, SeoModel } from 'src/app/services/seo.service';
import { Escola, Turma } from '../modls_eventos/evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-lista-turma',
  templateUrl: './lista-turma.component.html',
  styleUrls: ['./lista-turma.component.css']
})
export class ListaTurmaComponent  implements OnInit {


  public eventos: Turma[];
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
      const eventos = await this.eventoService.obterTodosCategoria().toPromise();
      this.eventos = eventos as Turma[]; // Realizando a conversão para Escola[]
      //console.log('Objeto de retorno:', eventos);
    } catch (error) {
      
    }
  }

}
