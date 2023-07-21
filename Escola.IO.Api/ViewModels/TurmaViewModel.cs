using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Escola.IO.Business.Models;

namespace Escola.IO.Api.ViewModels
{
    public class TurmaViewModel
    {

        [Key]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(14, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Nome { get; set; }

        public bool Status { get; set; }

        public Guid IdEscola { get; set; }
        // ...

        public Business.Models.Escola Escola { get; set; }

        public IEnumerable<Aluno> Alunos { get; set; }
    }
}