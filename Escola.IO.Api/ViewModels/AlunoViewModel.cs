using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Escola.IO.Business.Models;

namespace Escola.IO.Api.ViewModels
{
    public class AlunoViewModel
    {
        [Key]
        public Guid Id { get; set; }

        public Guid TurmaId { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(80, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Nome { get; set; }

        public string NomeTurma { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(14, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Documento { get; set; }

        public bool Status { get; set; }
        public bool Ativo { get; set; }

        public Turma Turma { get; set; }

    }
}