using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Escola.IO.Api.ViewModels;
using Escola.IO.Business.Interfaces;
using Escola.IO.Business.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Escola.IO.Api.Controllers
{
    [Route("api/alunos")]
    public class AlunosController : MainController
    {
        private readonly IAlunoRepository _alunoRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<AlunosController> _logger;
        private readonly IAlunoService _alunoService;
        private readonly ITurmaRepository _turma;

        public AlunosController(ILogger<AlunosController> logger,
            IAlunoRepository alunoRepository,
            IMapper mapper, IAlunoService alunoService,
            INotificador notificador, ITurmaRepository turma) : base(notificador)
        {
            _alunoRepository = alunoRepository;
            _mapper = mapper;
            _alunoService = alunoService;
            _turma = turma;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IEnumerable<AlunoViewModel>> ObterTodos()
        {
            var alunos = _mapper.Map<IEnumerable<AlunoViewModel>>(await _alunoRepository.ObterTodos());
            return alunos;
        }

        [AllowAnonymous]
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<AlunoViewModel>> ObterPorId(Guid id)
        {
            var aluno = await _alunoRepository.ObterPorId(id);
            if (aluno == null) return NotFound();

            return _mapper.Map<AlunoViewModel>(aluno);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<AlunoViewModel>> Adicionar(AlunoViewModel alunoViewModel)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _alunoService.Adicionar(_mapper.Map<Aluno>(alunoViewModel));

            return CustomResponse(alunoViewModel);
        }

        [AllowAnonymous]
        [HttpPut]
        public async Task<ActionResult<AlunoViewModel>> Atualizar( AlunoViewModel alunoViewModel)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _alunoService.Atualizar(_mapper.Map<Aluno>(alunoViewModel));

            return CustomResponse(alunoViewModel);
        }

        [AllowAnonymous]
        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<AlunoViewModel>> Remover(Guid id)
        {
            var alunoViewModel = await ObterPorId(id);
            if (alunoViewModel == null) return NotFound();

            await _alunoService.Remover(id);

            return CustomResponse();
        }
    }
}
