# Escola.IO.Api
Escola-App
Olá Tudo bem espero que sim!!
Vamos lá pra poder rodar o projeto da Api primeiro é preciso duas coisas:
número um crie essas tabelas em seu banco de dados local por favor:

CREATE TABLE Escolas (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Nome NVARCHAR(200) NOT NULL,
    Endereco NVARCHAR(200) NOT NULL,
);

CREATE TABLE Turmas (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Nome NVARCHAR(100) NOT NULL,
    IdEscola UNIQUEIDENTIFIER NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
    FOREIGN KEY (IdEscola) REFERENCES Escolas (Id)
);

CREATE TABLE Alunos (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Nome NVARCHAR(200) NOT NULL,
    Documento NVARCHAR(14) NOT NULL,
    TurmaId UNIQUEIDENTIFIER NOT NULL,
    Ativo BIT NOT NULL DEFAULT 1,
    NomeTurma NVARCHAR(200) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
    FOREIGN KEY (TurmaId) REFERENCES Turmas (Id)
);

Segundo ponto existe um arquivo que se chama appsettings.json lá você configura sua ConnectionStrings por gentileza e assim ele vai compilar.



Agora vamos para o frontEnd eu fiz ele em angular pra rodar ele você precisa seguir alguns passos simples:
Pré-requisitos:
Certifique-se de ter as seguintes ferramentas instaladas em seu computador:

Node.js: O Angular requer o Node.js para executar. Verifique se você tem o Node.js instalado usando o comando node -v no terminal.
Angular CLI: O Angular CLI (Command Line Interface) é uma ferramenta que simplifica o desenvolvimento Angular. Instale-o globalmente usando o comando npm install -g @angular/cli

depois disso execute esse comando no terminal na raiz do projeto "npm install" vai instalar todos os pacotes, depois de finalizar, execute o ng serve
com api rodando e front também vai funcionar tudo, a api está documentada sobre cada endpoints qualquer dúvida só me chamar angular e meio chatinho de rodar rsrs 
valeu...........
