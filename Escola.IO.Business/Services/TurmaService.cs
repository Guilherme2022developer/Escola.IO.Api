using System;
using System.Linq;
using System.Threading.Tasks;
using Escola.IO.Business.Interfaces;
using Escola.IO.Business.Models;
using Escola.IO.Business.Models.Validations;

namespace Escola.IO.Business.Services
{
    public class TurmaService : BaseService, ITurmaService
    {
        private readonly ITurmaRepository _turmaRepository;

        public TurmaService(ITurmaRepository turmaRepository,
            INotificador notificador) : base(notificador)
        {
            _turmaRepository = turmaRepository;
        }

        public async Task Adicionar(Turma turma)
        {
            if (!ExecutarValidacao(new TurmaValidation(), turma)) return;

            await _turmaRepository.Adicionar(turma);
        }

        public async Task Atualizar(Turma turma)
        {
            if (!ExecutarValidacao(new TurmaValidation(), turma)) return;

            await _turmaRepository.Atualizar(turma);
        }

        public async Task<bool> Remover(Guid id)
        {
           var turma = await _turmaRepository.ObterTurmaAluno(id);

           if(turma.Alunos.Count() > 0)
           {
               Notificar("Essa Turma possui alunos remover alunos primeiro.");
               return false;
           }

           await _turmaRepository.Remover(id);
           return true;
        }

        public void Dispose()
        {
            _turmaRepository?.Dispose();
        }
    }
}