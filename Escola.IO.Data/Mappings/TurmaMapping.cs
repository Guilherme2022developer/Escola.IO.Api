using Escola.IO.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Escola.IO.Data.Mappings
{
    public class TurmaMapping : IEntityTypeConfiguration<Turma>
    {
        public void Configure(EntityTypeBuilder<Turma> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Nome)
                .IsRequired()
                .HasColumnType("varchar(200)");

            // Relação 1 : N => Escola : Turmas
            builder.HasOne(p => p.Escola)
                .WithMany(p => p.Turmas)
                .HasForeignKey(p => p.IdEscola);

            // Relação 1 : N => Turma : Alunos
            builder.HasMany(p => p.Alunos)
                .WithOne(p => p.Turma)
                .HasForeignKey(p => p.TurmaId);

            builder.ToTable("Turmas");
        }
    }
}