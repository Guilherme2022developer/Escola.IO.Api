using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Escola.IO.Business.Models;

namespace Escola.IO.Business.Interfaces
{
  public interface  IAlunoRepository : IRepository<Aluno>
    {
        Task<Aluno> ObterAlunoTurma(Guid id);
        Task<Aluno> ObterAlunoEscolaTurma(Guid id);
    }
}
