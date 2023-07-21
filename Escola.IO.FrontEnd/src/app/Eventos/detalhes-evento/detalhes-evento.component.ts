import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { EventoService } from "src/app/Eventos/services/evento.service";
import { Escola, Evento } from "../modls_eventos/evento";


@Component({
  selector: 'app-detalhes-evento',
  templateUrl: './detalhes-evento.component.html'
})
export class DetalhesEventoComponent implements OnInit {
  public sub: Subscription;
  public eventoId: string = "";
  public evento: Escola;
  public enderecoMap: any;

  constructor(private eventoService: EventoService,
    private routeAc: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.sub = this.routeAc.params.subscribe(
      params => {
        this.eventoId = params['id'];
      });
  }
}

