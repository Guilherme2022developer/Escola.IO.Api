using System;
using System.Threading.Tasks;
using Escola.IO.Business.Interfaces;
using Escola.IO.Business.Models;
using Escola.IO.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Escola.IO.Data.Repository
{
    public class AlunoRepository : Repository<Aluno>, IAlunoRepository
    {
        public AlunoRepository(MeuDbContext db) : base(db)
        {
        }

        public async Task<Aluno> ObterAlunoTurma(Guid id)
        {
            return await Db.Alunos.AsNoTracking()
                .Include(a => a.Turma)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<Aluno> ObterAlunoEscolaTurma(Guid id)
        {
            return await Db.Alunos.AsNoTracking()
                .Include(a => a.Turma)
                .ThenInclude(t => t.Escola)
                .FirstOrDefaultAsync(a => a.Id == id);
        }
    }
}