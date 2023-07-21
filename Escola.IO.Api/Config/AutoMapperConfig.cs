using AutoMapper;
using Escola.IO.Api.ViewModels;
using Escola.IO.Business.Models;

namespace Escola.IO.Api.Config
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Aluno, AlunoViewModel>().ReverseMap();

            CreateMap<Business.Models.Escola, EscolaViewModel>().ReverseMap();

            CreateMap<Turma, TurmaViewModel>().ReverseMap();

            
        }
    }
}