import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { Aluno, AlunoApiResponse, Categoria, Endereco, Escola, EscolaApiResponse, Evento, Turma, TurmaApiResponse } from "../modls_eventos/evento";
import { SeviceBase } from "../../services/sevice.base";



@Injectable()
export class EventoService extends SeviceBase{

    constructor(private http: HttpClient){super()}


        ObterCategoria() : Observable<Turma[]>{
            return this.http
            .get<Turma[]>(this.UrlServiceV1 + "api/turmas")
            .pipe(catchError(super.seviceError));
        }

        obterTodosCategoria(): Observable<Turma[]> {
            return this.http.get<TurmaApiResponse>(this.UrlServiceV1 + 'api/turmas').pipe(
              map(response => response.$values),
              catchError(super.seviceError)
            );
          }

          obterTodosCategoriaEscolas(): Observable<Escola[]> {
            return this.http.get<EscolaApiResponse>(this.UrlServiceV1 + 'api/escolas').pipe(
              map(response => response.$values),
              catchError(super.seviceError)
            );
          }

        registrarEvento(evento: Escola) : Observable<Evento[]>{
            return this.http
            .post(this.UrlServiceV1 + "api/escolas", evento)
            .pipe(map(super.extractData),catchError(super.seviceError));
        }

        registrarEventoTurma(evento: Escola) : Observable<Turma[]>{
            return this.http
            .post(this.UrlServiceV1 + "api/turmas", evento)
            .pipe(map(super.extractData),catchError(super.seviceError));
        }

        registrarEventoAluno(evento: Aluno) : Observable<Aluno[]>{
            return this.http
            .post(this.UrlServiceV1 + "api/alunos", evento)
            .pipe(map(super.extractData),catchError(super.seviceError));
        }

        
        obterTodos(): Observable<Escola[]> {
            return this.http.get<EscolaApiResponse>(this.UrlServiceV1 + 'api/escolas').pipe(
              map(response => response.$values),
              catchError(super.seviceError)
            );
          }

          obterTodosAlunos(): Observable<Aluno[]> {
            return this.http.get<AlunoApiResponse>(this.UrlServiceV1 + 'api/alunos').pipe(
              map(response => response.$values),
              catchError(super.seviceError)
            );
          }

        obterEvento(id: string):Observable<Escola>{
            return this.http
            .get<Escola>(this.UrlServiceV1 + "api/escolas/" + id)
            .pipe(
            catchError(super.seviceError));
        };

        obterEventoAluno(id: string):Observable<Aluno>{
            return this.http
            .get<Aluno>(this.UrlServiceV1 + "api/alunos/" + id)
            .pipe(
            catchError(super.seviceError));
        };

       
        obterMeuEvento(id: string):Observable<Escola>{
            return  this.http
             .get<Escola>(this.UrlServiceV1 + "api/escolas/" + id)
             .pipe(
             catchError(super.seviceError));
         };

         obterMeuEventoTurma(id: string):Observable<Turma>{
            return  this.http
             .get<Turma>(this.UrlServiceV1 + "api/turmas/" + id)
             .pipe(
             catchError(super.seviceError));
         };


         obterMeuEventoAluno(id: string):Observable<Aluno>{
            return  this.http
             .get<Aluno>(this.UrlServiceV1 + "api/alunos/" + id)
             .pipe(
             catchError(super.seviceError));
         };

         obterMeusEventos() : Observable<Evento[]>{
            return this.http
            .get<Evento[]>(this.UrlServiceV1 + "eventos/meus-eventos",super.ObterAuthHeaderJson())
            .pipe(catchError(super.seviceError));
        }

        atualizarEvento(evento: Escola):Observable<Escola>{
            return this.http
            .put(this.UrlServiceV1 + "api/escolas/",evento)
            .pipe(map(super.extractData),
            catchError(super.seviceError));
        };

        atualizarEventoTurma(evento: Turma):Observable<Turma>{
            return this.http
            .put(this.UrlServiceV1 + "api/turmas/",evento)
            .pipe(map(super.extractData),
            catchError(super.seviceError));
        };

        atualizarEventoAluno(evento: Aluno):Observable<Aluno>{
            return this.http
            .put(this.UrlServiceV1 + "api/alunos/",evento)
            .pipe(map(super.extractData),
            catchError(super.seviceError));
        };

        ExcluirEvento(id: string):Observable<Escola>{
            return this.http
            .delete(this.UrlServiceV1 + "api/escolas/" + id)
            .pipe(map(super.extractData),
            catchError(super.seviceError));
        };

        ExcluirEventoTurma(id: string):Observable<Turma>{
            return this.http
            .delete(this.UrlServiceV1 + "api/turmas/" + id)
            .pipe(map(super.extractData),
            catchError(super.seviceError));
        };
       
        ExcluirEventoAluno(id: string):Observable<Aluno>{
            return this.http
            .delete(this.UrlServiceV1 + "api/alunos/" + id)
            .pipe(map(super.extractData),
            catchError(super.seviceError));
        };

        adicionarEndereco(endereco: Endereco):Observable<Endereco>{
            let response =  this.http
            .post(this.UrlServiceV1 + "endereco",endereco,super.ObterAuthHeaderJson())
            .pipe(map(super.extractData),
            catchError(super.seviceError));
            return response;
        };

        atualizarEndereco(endereco: Endereco):Observable<Endereco>{
            let response = this.http
            .put(this.UrlServiceV1 + "endereco",endereco,super.ObterAuthHeaderJson())
            .pipe(map(super.extractData),
            catchError(super.seviceError));
            return response;
        };
}