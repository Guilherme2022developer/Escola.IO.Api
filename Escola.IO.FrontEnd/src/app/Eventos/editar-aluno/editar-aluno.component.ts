import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SnotifireService } from 'ngx-snotifire';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';
import { DateUtils } from 'src/app/comom/data-type-utils/data-type-utils';
import { GenericValidator } from 'src/app/comom/data-type-utils/validation/generic.form.validator';
import { Escola, Endereco, Categoria, Aluno, Turma } from '../modls_eventos/evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-editar-aluno',
  templateUrl: './editar-aluno.component.html',
  styleUrls: ['./editar-aluno.component.css']
})
export class EditarAlunoComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public myDatePickerOptions = DateUtils.getMyDatePickerOptions();

  public errors: any[] = [];
  public errorsEndereco: any[] = [];
  public eventoForm: FormGroup;
  public enderecoForm: FormGroup;
  public evento: Aluno;
  public endereco: Endereco;
  public categorias: Turma[];
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
      nome: {
        required: 'O Nome é requerido.',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      },
      documento: {
        required: 'Informe o documento'
      },
      turmaId: {
        required: 'Informe a turma'
      },
      NomeTurma: {
        required: 'Informe a turma'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.evento = new Aluno();
    this.modalVisible = false;
  }

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  ngOnInit() {
    this.eventoForm = this.fb.group({
      Nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      documento: ['', Validators.required],
      NomeTurma: ['', Validators.required],
      turmaId: ['', Validators.required],
    });

    this.sub = this.route.params.subscribe(params => {
      this.eventoId = params['id'];
      this.obterEvento(this.eventoId);
    });

    this.eventoService.obterTodosCategoria()
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
    this.eventoService.obterEventoAluno(id).subscribe(
      evento => this.preencherFormEvento(evento)
    );
  }

  preencherFormEvento(evento: Aluno): void {
    this.evento = evento;
    
    this.eventoForm.patchValue({
    Nome: this.evento.nome,
    documento: this.evento.documento,
    NomeTurma: this.evento.nomeTurma,
    turmaId: this.evento.turmaId
    });
  }

  editarEvento() {
    if (this.eventoForm.dirty && this.eventoForm.valid) {
      let p = Object.assign({}, this.evento, this.eventoForm.value);
      p.nome = p.nome
      p.documento = p.documento
      p.nomeTurma = p.nomeTurma
      this.eventoService.atualizarEventoAluno(p).subscribe(
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
        this.router.navigate(['/eventos/lista-eventos']);
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
