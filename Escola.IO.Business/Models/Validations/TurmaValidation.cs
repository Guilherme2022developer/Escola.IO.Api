using FluentValidation;

namespace Escola.IO.Business.Models.Validations
{
    public class TurmaValidation : AbstractValidator<Turma> 
    {
        public TurmaValidation()
        {
            RuleFor(c => c.Nome)
                .NotEmpty().WithMessage("O campo {PropertyName} precisa ser fornecido")
                .Length(2, 200).WithMessage("O campo {PropertyName} precisa ter entre {MinLength} e {MaxLength} caracteres");
        }
    }
}