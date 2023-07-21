using System;
using System.Threading.Tasks;
using Escola.IO.Business.Models;

namespace Escola.IO.Business.Interfaces
{
    public interface IAlunoService : IDisposable
    {
        Task<bool> Adicionar(Aluno aluno);
        Task<bool> Atualizar(Aluno aluno);
        Task<bool> Remover(Guid id);

        Task AtualizarTurma(Turma turma);
    }
}
