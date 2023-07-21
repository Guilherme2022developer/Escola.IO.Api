using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Escola.IO.Business.Interfaces;
using Escola.IO.Business.Models;
using Escola.IO.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Escola.IO.Data.Repository
{
    public class TurmaRepository : Repository<Turma>, ITurmaRepository
    {
        public TurmaRepository(MeuDbContext db) : base(db)
        {
        }

        public async Task<IEnumerable<Turma>> ObterTurmaPorEscola(Guid escolaId)
        {
            return await Db.Turmas.AsNoTracking()
                .Where(t => t.IdEscola == escolaId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Turma>> ObterTurma(Guid id)
        {
            return await Db.Turmas.AsNoTracking()
                .Where(t => t.Id == id)
                .ToListAsync();
        }

        public async Task<Turma> ObterTurmaAluno(Guid id)
        {
            return await Db.Turmas.AsNoTracking()
                .Include(t => t.Alunos)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

    }
}