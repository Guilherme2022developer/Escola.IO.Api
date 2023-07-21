# Escola.IO.Api
Escola-App
 Olá! Tudo bem? Espero que sim!! Vamos lá para rodar o projeto da API. Primeiro, precisamos de duas coisas:

1.Por favor, crie essas tabelas em seu banco de dados local:


*CREATE TABLE Escolas (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Nome NVARCHAR(200) NOT NULL,
    Endereco NVARCHAR(200) NOT NULL,
);*



*CREATE TABLE Turmas (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Nome NVARCHAR(100) NOT NULL,
    IdEscola UNIQUEIDENTIFIER NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
    FOREIGN KEY ( IdEscola ) REFERENCES Escolas (Id)
);*


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


Segundo ponto, existe um arquivo chamado appsettings.json onde você pode configurar suas ConnectionStrings. Por gentileza, certifique-se de fazer essa configuração corretamente, pois ela é crucial para que o aplicativo compile corretamente.



Agora, vamos para o FrontEnd! Eu desenvolvi o FrontEnd utilizando Angular. Para rodá-lo, você precisa seguir alguns passos simples:

Pré-requisitos:
Certifique-se de ter as seguintes ferramentas instaladas em seu computador:

1.Node.js: O Angular requer o Node.js para executar. Verifique se você tem o Node.js instalado usando o comando node -v no terminal.

2.Angular CLI: O Angular CLI (Command Line Interface) é uma ferramenta que simplifica o desenvolvimento Angular. Instale-o globalmente usando o comando npm install -g @angular/cli.

Após instalar as ferramentas necessárias, siga os passos abaixo:

1.Abra o terminal na raiz do projeto.

2.Execute o comando npm install. Isso irá instalar todas as dependências necessárias para o projeto.

3.Após a conclusão da instalação, execute o comando ng serve para iniciar o servidor de desenvolvimento do Angular.

Certifique-se de que a API também esteja rodando em paralelo para que o FrontEnd funcione corretamente. A documentação da API contém informações sobre cada endpoint, caso tenha dúvidas.

Se surgir qualquer dúvida durante o processo de execução do Angular, estou à disposição para ajudar, Valeuu.
