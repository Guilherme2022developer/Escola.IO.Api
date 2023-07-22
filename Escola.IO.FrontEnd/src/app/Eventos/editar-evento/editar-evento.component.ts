import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifireService } from 'ngx-snotifire';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { CurrencyUtils } from 'src/app/comom/data-type-utils/CurrencyUtils';
import { DateUtils } from 'src/app/comom/data-type-utils/data-type-utils';
import { GenericValidator } from 'src/app/comom/data-type-utils/validation/generic.form.validator';
import { EventoService } from 'src/app/Eventos/services/evento.service';
import { Categoria, Endereco, Escola, Evento } from '../modls_eventos/evento';

@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.css']
})
export class EditarEventoComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public myDatePickerOptions = DateUtils.getMyDatePickerOptions();

  public errors: any[] = [];
  public errorsEndereco: any[] = [];
  public eventoForm: FormGroup;
  public enderecoForm: FormGroup;
  public evento: Escola;
  public endereco: Endereco;
  public categorias: Categoria[];
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
      Endereco: {
        required: 'Informe o Endereço'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.evento = new Escola();
    this.modalVisible = false;
  }

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  ngOnInit() {
    this.eventoForm = this.fb.group({
      Nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      Endereco: ['', Validators.required],
    });

    this.sub = this.route.params.subscribe(params => {
      this.eventoId = params['id'];
      this.obterEvento(this.eventoId);
    });
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
    this.eventoService.obterEvento(id).subscribe(
      evento => this.preencherFormEvento(evento)
    );
  }

  preencherFormEvento(evento: Escola): void {
    this.evento = evento;
    
    this.eventoForm.patchValue({
      Nome: this.evento.nome,
      Endereco: this.evento.endereco,
    });
  }

  editarEvento() {
    if (this.eventoForm.dirty && this.eventoForm.valid) {
      let p = Object.assign({}, this.evento, this.eventoForm.value);
      p.Nome = p.Nome
      p.Endereco = p.Endereco
      this.eventoService.atualizarEvento(p).subscribe(
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
