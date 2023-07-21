using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Escola.IO.Business.Models
{
    public class Aluno : Entity
    {
        public Guid TurmaId { get; set; }
        public string Nome { get; set; }
        public string NomeTurma { get; set; }
        public string Documento { get; set; }
        public bool Ativo { get; set; }

        public bool Status { get; set; }

        public Turma Turma { get; set; }
    }
}
