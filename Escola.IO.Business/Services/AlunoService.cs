using System;
using System.Linq;
using System.Threading.Tasks;
using Escola.IO.Business.Interfaces;
using Escola.IO.Business.Models;
using Escola.IO.Business.Models.Validations;

namespace Escola.IO.Business.Services
{
    public class AlunoService : BaseService, IAlunoService
    {
        private readonly IAlunoRepository _alunoRepository;
        private readonly ITurmaRepository _turmaRepository;

        public AlunoService(IAlunoRepository alunoRepository,
                                 ITurmaRepository turmaRepository,
                                 INotificador notificador) : base(notificador)
        {
            _alunoRepository = alunoRepository;
            _turmaRepository = turmaRepository;
        }

        public async Task<bool> Adicionar(Aluno aluno)
        {
            if (!ExecutarValidacao(new AlunoValidation(), aluno)) return false;

            if (_alunoRepository.Buscar(f => f.Documento == aluno.Documento).Result.Any())
            {
                Notificar("Já existe um aluno com este documento infomado.");
                return false;
            }

            await _alunoRepository.Adicionar(aluno);
            return true;
        }

        public async Task<bool> Atualizar(Aluno aluno)
        {
            if (!ExecutarValidacao(new AlunoValidation(), aluno)) return false;

            if (_alunoRepository.Buscar(f => f.Documento == aluno.Documento && f.Id != aluno.Id).Result.Any())
            {
                Notificar("Já existe um aluno com este documento infomado.");
                return false;
            }

            await _alunoRepository.Atualizar(aluno);
            return true;
        }

        public async Task AtualizarTurma(Turma turma)
        {
            if (!ExecutarValidacao(new TurmaValidation(), turma)) return;

            await _turmaRepository.Atualizar(turma);
        }

        public async Task<bool> Remover(Guid id)
        {
            await _alunoRepository.Remover(id);
            return true;
        }

        public void Dispose()
        {
            _alunoRepository?.Dispose();
            _turmaRepository?.Dispose();
        }
    }
}