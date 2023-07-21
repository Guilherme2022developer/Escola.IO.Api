using System;
using System.Linq;
using System.Threading.Tasks;
using Escola.IO.Business.Interfaces;
using Escola.IO.Business.Models.Validations;

namespace Escola.IO.Business.Services
{
    public class EscolaService : BaseService, IEscolaService
    {
        private readonly IEscolaRepository _EscolaRepository;

        public EscolaService(IEscolaRepository escolaRepository,
            INotificador notificador) : base(notificador)
        {
            _EscolaRepository = escolaRepository;
        }

        public async Task Adicionar(Models.Escola escola)
        {
            if (!ExecutarValidacao(new EscolaValidation(), escola)) return;

            await _EscolaRepository.Adicionar(escola);
        }

        public async Task Atualizar(Models.Escola escola)
        {
            if (!ExecutarValidacao(new EscolaValidation(), escola)) return;

            await _EscolaRepository.Atualizar(escola);
        }

        public async Task<bool> Remover(Guid id)
        {

            var escola = await _EscolaRepository.ObterEscola(id);

            if (escola.Turmas.Any())
            {
                Notificar("Essa Escola possui turmas remover alunos primeiro.");
                return false;
            }

            await _EscolaRepository.Remover(id);
            return true;
        }

        public void Dispose()
        {
            _EscolaRepository?.Dispose();
        }
    }
}