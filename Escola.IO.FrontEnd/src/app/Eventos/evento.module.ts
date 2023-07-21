import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// modules
import { MyDatePickerModule } from 'mydatepicker';

// components
import { EventoComponent } from "./evento.component";
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { AdicionarEventoComponent } from "./adicionar-evento/adicionar-evento.component";
import { EditarEventoComponent } from './editar-evento/editar-evento.component';
import { MeusEventosComponent } from './meus-eventos/meus-eventos.component';
import { DetalhesEventoComponent } from './detalhes-evento/detalhes-evento.component';
import { ExcluirEventoComponent } from './excluir-evento/excluir-evento.component';

// services
import { SeoService } from '../services/seo.service';
import { EventoService } from "./services/evento.service";

import { AuthService } from "./services/auth.service";
import { OrganizadorService } from '../services/organizador.sevice';
import { ErrorInterceptor } from '../services/htpp.error.handler';
import { SharedModule } from '../shared/shared.module/shared.module.module';
import { eventosRouterConfig } from './eventos.routes';
import { AdicionarAlunoComponent } from './adicionar-aluno/adicionar-aluno.component';
import { EditarAlunoComponent } from './editar-aluno/editar-aluno.component';
import { ExcluirAlunoComponent } from './excluir-aluno/excluir-aluno.component';
import { ListaAlunosComponent } from './lista-alunos/lista-alunos.component';
import { ListaTurmaComponent } from './lista-turma/lista-turma.component';
import { ExcluirTurmaComponent } from './excluir-turma/excluir-turma.component';
import { EditarTurmaComponent } from './editar-turma/editar-turma.component';
import { AdicionarTurmaComponent } from './adicionar-turma/adicionar-turma.component';


// config


// my modules


@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild(eventosRouterConfig),
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MyDatePickerModule,
    ],
    declarations: [
        EventoComponent,
        ListaEventosComponent,
        AdicionarEventoComponent,
        EditarEventoComponent,
        MeusEventosComponent,
        DetalhesEventoComponent,
        ExcluirEventoComponent,
        AdicionarAlunoComponent,
        EditarAlunoComponent,
        ExcluirAlunoComponent,
        ListaAlunosComponent,
        ListaTurmaComponent,
        ExcluirTurmaComponent,
        EditarTurmaComponent,
        AdicionarTurmaComponent
    ],
    providers: [
        Title,
        SeoService,
        EventoService,
        OrganizadorService,
        AuthService,        
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
          }
    ],
    exports: [RouterModule]
})

export class EventosModule { }