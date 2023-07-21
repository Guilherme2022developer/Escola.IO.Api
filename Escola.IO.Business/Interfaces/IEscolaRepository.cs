using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Escola.IO.Business.Interfaces
{
    public interface IEscolaRepository : IRepository<Models.Escola>
    {

        Task<Models.Escola> ObterEscolaPorAluno(Guid alunoId);
        Task<IEnumerable<Models.Escola>> ObterEscolasAlunos();
        Task<Models.Escola> ObterEscola(Guid id);
    }
}