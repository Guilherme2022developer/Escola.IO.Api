import { Routes } from "@angular/router";
import { AdicionarAlunoComponent } from "./adicionar-aluno/adicionar-aluno.component";
import { AdicionarEventoComponent } from "./adicionar-evento/adicionar-evento.component";
import { AdicionarTurmaComponent } from "./adicionar-turma/adicionar-turma.component";
import { DetalhesEventoComponent } from "./detalhes-evento/detalhes-evento.component";
import { EditarAlunoComponent } from "./editar-aluno/editar-aluno.component";
import { EditarEventoComponent } from "./editar-evento/editar-evento.component";
import { EditarTurmaComponent } from "./editar-turma/editar-turma.component";
import { EventoComponent } from "./evento.component";
import { ExcluirAlunoComponent } from "./excluir-aluno/excluir-aluno.component";
import { ExcluirEventoComponent } from "./excluir-evento/excluir-evento.component";
import { ExcluirTurmaComponent } from "./excluir-turma/excluir-turma.component";
import { ListaAlunosComponent } from "./lista-alunos/lista-alunos.component";
import { ListaEventosComponent } from "./lista-eventos/lista-eventos.component";
import { ListaTurmaComponent } from "./lista-turma/lista-turma.component";
import { MeusEventosComponent } from "./meus-eventos/meus-eventos.component";
import { AuthService } from "./services/auth.service";

export const eventosRouterConfig: Routes = [
    {
        path: '', component: EventoComponent,
        children: [
            { path: '', component: ListaEventosComponent },
            { path: 'lista-eventos', component: ListaEventosComponent },
            { path: 'novo',component: AdicionarEventoComponent},
            { path: 'meus-eventos', component: MeusEventosComponent },
            { path: 'editar/:id',  component: EditarEventoComponent},
            { path: 'detalhes/:id', component: DetalhesEventoComponent },
            { path: 'excluir/:id',component: ExcluirEventoComponent },
            { path: 'novo-aluno',component: AdicionarAlunoComponent },
            { path: 'aluno-lista',component: ListaAlunosComponent },
            { path: 'aluno/editar/:id',component: EditarAlunoComponent },
            { path: 'aluno/excluir/:id',component: ExcluirAlunoComponent },
            { path: 'turma',component: ListaTurmaComponent },
            { path: 'nova-turma',component: AdicionarTurmaComponent },
            { path: 'turma/excluir/:id',component: ExcluirTurmaComponent },
            { path: 'turma/editar/:id',component: EditarTurmaComponent },
        ]
    }
];