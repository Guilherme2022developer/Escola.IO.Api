using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Escola.IO.Business.Models
{
    public class Escola : Entity
    {
        public string Nome { get; set; }
        public string Endereco { get; set; }
        // ...

        public IEnumerable<Turma> Turmas { get; set; }
    }
}
