using System;
using System.Threading.Tasks;

namespace Escola.IO.Business.Interfaces
{
    public interface IEscolaService : IDisposable
    {
        Task Adicionar(Models.Escola escola);
        Task Atualizar(Models.Escola escola);
        Task<bool> Remover(Guid id);
    }
}