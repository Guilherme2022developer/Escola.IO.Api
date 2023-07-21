export class Evento {
    id: string;
    nome: string;
    descricaoCurta: string;
    descricaoLonga: string;
    dataInicio: Date;
    dataFim: Date;
    gratuito: boolean;
    valor: string;
    online: boolean;
    nomeEmpresa: string;
    endereco: Endereco;
    categoriaId: string;
    organizadorId: string;
}

export interface EscolaApiResponse {
    $id: string;
    $values: Escola[];
  }

  export interface TurmaApiResponse {
    $id: string;
    $values: Turma[];
  }

  export interface AlunoApiResponse {
    $id: string;
    $values: Aluno[];
  }
  

export class Escola {
    id: string;
    nome: string;
    endereco: string;
}

export class Aluno {
    id: string;
    turmaId: string;
    nome: string;
    nomeTurma: string;
    documento: string;
    turma: Turma;
}

export class Turma {
    id: string;
    idEscola: string;
    nome: string;
}

export class Endereco {
    id: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
    eventoId: string;
}

export interface Categoria {
    id: string;
    nome: string;
}