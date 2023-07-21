import { Component, OnInit } from '@angular/core';
import { SeoService, SeoModel } from 'src/app/services/seo.service';
import { Aluno, Escola } from '../modls_eventos/evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-lista-alunos',
  templateUrl: './lista-alunos.component.html',
  styleUrls: ['./lista-alunos.component.css']
})
export class ListaAlunosComponent implements OnInit {
  public eventos: Aluno[];
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
      const eventos = await this.eventoService.obterTodosAlunos().toPromise();
      this.eventos = eventos as Aluno[]; // Realizando a conversão para Escola[]
      //console.log('Objeto de retorno:', eventos);
    } catch (error) {
      
    }
  }
}
