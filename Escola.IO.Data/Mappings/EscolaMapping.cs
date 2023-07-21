using Escola.IO.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Escola.IO.Data.Mappings
{
    public class EscolaMapping : IEntityTypeConfiguration<Business.Models.Escola>
    {
        public void Configure(EntityTypeBuilder<Business.Models.Escola> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Nome)
                .IsRequired()
                .HasColumnType("varchar(200)");

            builder.Property(p => p.Endereco)
                .IsRequired()
                .HasColumnType("varchar(200)");

            // Relação 1 : N => Escola : Turmas
            builder.HasMany(p => p.Turmas)
                .WithOne(p => p.Escola)
                .HasForeignKey(p => p.Id);

            builder.ToTable("Escolas");
        }
    }
}