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
    [Route("api/turmas")]
    public class TurmaController : MainController
    {
        private readonly ITurmaRepository _turmaRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<TurmaController> _logger;
        private readonly ITurmaService _turmaService;

        public TurmaController(ILogger<TurmaController> logger,
            ITurmaRepository turmaRepository,
            IMapper mapper, ITurmaService turmaService,
            INotificador notificador) : base(notificador)
        {
            _turmaRepository = turmaRepository;
            _mapper = mapper;
            _turmaService = turmaService;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IEnumerable<TurmaViewModel>> ObterTodos()
        {
            var turmas = _mapper.Map<IEnumerable<TurmaViewModel>>(await _turmaRepository.ObterTodos());
            return turmas;
        }

        [AllowAnonymous]
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<TurmaViewModel>> ObterPorId(Guid id)
        {
            var turma = await _turmaRepository.ObterPorId(id);
            if (turma == null) return NotFound();

            return _mapper.Map<TurmaViewModel>(turma);
        }

        [HttpPost]
        public async Task<ActionResult<TurmaViewModel>> Adicionar(TurmaViewModel turmaViewModel)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _turmaService.Adicionar(_mapper.Map<Turma>(turmaViewModel));

            return CustomResponse(turmaViewModel);
        }

        [HttpPut]
        public async Task<ActionResult<TurmaViewModel>> Atualizar(TurmaViewModel turmaViewModel)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _turmaService.Atualizar(_mapper.Map<Turma>(turmaViewModel));

            return CustomResponse(turmaViewModel);
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<TurmaViewModel>> Remover(Guid id)
        {
            var turmaViewModel = await ObterPorId(id);
            if (turmaViewModel == null) return NotFound();

            await _turmaService.Remover(id);

            return CustomResponse();
        }
    }
}
