import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SnotifireService } from 'ngx-snotifire';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';
import { DateUtils } from 'src/app/comom/data-type-utils/data-type-utils';
import { GenericValidator } from 'src/app/comom/data-type-utils/validation/generic.form.validator';
import { Escola, Endereco, Categoria, Turma } from '../modls_eventos/evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-editar-turma',
  templateUrl: './editar-turma.component.html',
  styleUrls: ['./editar-turma.component.css']
})
export class EditarTurmaComponent  implements OnInit, AfterViewInit {


  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public myDatePickerOptions = DateUtils.getMyDatePickerOptions();

  public errors: any[] = [];
  public errorsEndereco: any[] = [];
  public eventoForm: FormGroup;
  public enderecoForm: FormGroup;
  public evento: Turma;
  public endereco: Endereco;
  public categorias: Escola[];
  public eventoId: string = "";

  public gratuito: boolean;
  public online: boolean;
  public sub: Subscription;
  public modalVisible: boolean = true;

  constructor(
    private fb: FormBuilder,
    private eventoService: EventoService,
    private router: Router,
    private route: ActivatedRoute,
    private snotifireService: SnotifireService
  ) {
    this.validationMessages = {
      Nome: {
        required: 'O Nome é requerido.',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      },
      idEscola: {
        required: 'Informe o Escola'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.evento = new Turma();
    this.modalVisible = false;
  }

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  ngOnInit() {
    this.eventoForm = this.fb.group({
      Nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      idEscola: ['', Validators.required],
    });

    this.sub = this.route.params.subscribe(params => {
      this.eventoId = params['id'];
      this.obterEvento(this.eventoId);
    });

    this.eventoService.obterTodosCategoriaEscolas()
    .subscribe(
      categorias => this.categorias = categorias,
      error => this.errors = error
      
    );
  }

  ngAfterViewInit() {
    let controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) =>
      fromEvent(formControl.nativeElement, 'blur')
    );

    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.eventoForm);
    });
  }

  obterEvento(id: string) {
    this.eventoService.obterMeuEventoTurma(id).subscribe(
      evento => this.preencherFormEvento(evento)
    );
  }

  preencherFormEvento(evento: Turma): void {
    this.evento = evento;
    
    this.eventoForm.patchValue({
      Nome: this.evento.nome,
      idEscola: this.evento.idEscola
    });
  }

  editarEvento() {
    if (this.eventoForm.dirty && this.eventoForm.valid) {
      let p = Object.assign({}, this.evento, this.eventoForm.value);
      p.Nome = p.Nome
      this.eventoService.atualizarEventoTurma(p).subscribe(
        result => this.onSalveComplete(result),
        fail => this.onError(fail)
      );
    }
  }

  onSalveComplete(response: any) {
    this.errors = [];
    let toasterMessage = this.snotifireService.success('Obaa deu certo', 'Sucesso!', {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });

    if (toasterMessage) {
      toasterMessage.eventEmitter.subscribe(() => {
        this.router.navigate(['/eventos/turma']);
      });
    }
  }

  onError(fail: any) {
    this.snotifireService.error('Ocorreu um erro!', 'OPS!', {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
    this.errors = fail.error.errors.$values;
  }

  public showModal(): void {
    this.modalVisible = true;
  }
  

  public hideModal(): void {
    this.modalVisible = false;
  }


}
