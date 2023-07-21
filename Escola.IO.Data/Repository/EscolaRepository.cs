using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Escola.IO.Business.Interfaces;
using Escola.IO.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Escola.IO.Data.Repository
{
    public class EscolaRepository : Repository<Business.Models.Escola>, IEscolaRepository
    {
        public EscolaRepository(MeuDbContext db) : base(db) {}

        public async Task<Business.Models.Escola> ObterEscolaPorAluno(Guid alunoId)
        {
            return await Db.Alunos.AsNoTracking()
                .Where(a => a.Id == alunoId)
                .Select(a => a.Turma.Escola)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Business.Models.Escola>> ObterEscolasAlunos()
        {
            return await Db.Escolas.AsNoTracking()
                .Include(e => e.Turmas)
                .ThenInclude(t => t.Alunos)
                .ToListAsync();
        }

        public async Task<Business.Models.Escola> ObterEscola(Guid id)
        {
            return await Db.Escolas
                .AsNoTracking()
                .Include(escola => escola.Turmas) // Inclui as turmas relacionadas à escola
                .ThenInclude(turma => turma.Alunos) // Inclui os alunos relacionados a cada turma
                .FirstOrDefaultAsync(escola => escola.Id == id);
        }
    }
}