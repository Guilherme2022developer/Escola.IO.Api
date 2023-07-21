using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Escola.IO.Business.Models
{
    public class Turma : Entity
    {
        public string Nome { get; set; }
        public Guid IdEscola { get; set; }
        // ...

        public Escola Escola { get; set; }
        public IEnumerable<Aluno> Alunos { get; set; }

        public bool Status { get; set; }
    }
}
