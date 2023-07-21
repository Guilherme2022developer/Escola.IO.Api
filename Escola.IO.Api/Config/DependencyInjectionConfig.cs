using Escola.IO.Business.Interfaces;
using Escola.IO.Business.Notificacoes;
using Escola.IO.Business.Services;
using Escola.IO.Data.Context;
using Escola.IO.Data.Repository;
using Microsoft.Extensions.DependencyInjection;

namespace Escola.IO.Api.Config
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection ResolveDependency(this IServiceCollection services)
        {
            services.AddScoped<MeuDbContext>();
            services.AddScoped<IAlunoRepository, AlunoRepository>();
            services.AddScoped<IEscolaRepository, EscolaRepository>();
            services.AddScoped<ITurmaRepository, TurmaRepository>();

            services.AddRazorPages();

            services.AddScoped<INotificador, Notificador>();
            services.AddScoped<IAlunoService, AlunoService>();
            services.AddScoped<IEscolaService, EscolaService>();
            services.AddScoped<ITurmaService, TurmaService>();

            return services;
        }
    }
}