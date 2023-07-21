using System;
using System.Threading.Tasks;
using Escola.IO.Business.Models;

namespace Escola.IO.Business.Interfaces
{
    public interface ITurmaService : IDisposable
    {
        Task Adicionar(Turma turma);
        Task Atualizar(Turma turma);
        Task<bool> Remover(Guid id);
    }
}