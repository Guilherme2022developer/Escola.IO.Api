using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Escola.IO.Business.Models;

namespace Escola.IO.Business.Interfaces
{
    public interface ITurmaRepository : IRepository<Turma>
    {
        Task<IEnumerable<Turma>> ObterTurmaPorEscola(Guid escolaId);
        Task<IEnumerable<Turma>> ObterTurma(Guid Id);
        Task<Turma> ObterTurmaAluno(Guid id);
    }
}