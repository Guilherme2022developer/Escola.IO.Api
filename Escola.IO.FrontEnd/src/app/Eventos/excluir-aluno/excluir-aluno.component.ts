import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifireService } from 'ngx-snotifire';
import { Subscription } from 'rxjs';
import { Aluno, Escola } from '../modls_eventos/evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-excluir-aluno',
  templateUrl: './excluir-aluno.component.html',
  styleUrls: ['./excluir-aluno.component.css']
})
export class ExcluirAlunoComponent implements OnInit {


  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public sub: Subscription;
  public eventoId: string = "";
  public evento: Aluno;
  public errors: any[] = [];

  constructor(private eventoService: EventoService,
    private route: ActivatedRoute,
    private router: Router, private snotifireService: SnotifireService) {


    this.evento = new Aluno();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        this.eventoId = params['id'];
      });

    this.eventoService.obterMeuEventoAluno(this.eventoId)
      .subscribe(
      evento => { this.evento = evento; },
      );
  }

  public excluirEvento() {
    this.eventoService.ExcluirEventoAluno(this.eventoId).subscribe(
      result => {this.onDeleteComplete(result)},
      fail => {this.onError(fail)}
    );

  }

  public onDeleteComplete(evento: any) {
    let toasterMessage =  this.snotifireService.success('Escola Apagado com Sucesso!', 'Obaa deu certo..', {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });

    if(toasterMessage){
      toasterMessage.eventEmitter.subscribe(()=>{
        this.router.navigate(['/eventos/aluno-lista']);
      });
    }
  }

  public onError(fail: any) {
    this.snotifireService.error('Ocorreu um erro!', 'OPS!', {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
    this.errors = fail.error.errors.$values;
  }

}
