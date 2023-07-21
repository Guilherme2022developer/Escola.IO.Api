using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Escola.IO.Api.ViewModels;
using Escola.IO.Business.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Escola.IO.Api.Controllers
{
    [Route("api/escolas")]
    public class EscolaController : MainController
    {
        private readonly IEscolaRepository _escolaRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<EscolaController> _logger;
        private readonly IEscolaService _escolaService;

        public EscolaController(ILogger<EscolaController> logger,
            IEscolaRepository escolaRepository,
            IMapper mapper, IEscolaService escolaService,
            INotificador notificador) : base(notificador)
        {
            _escolaRepository = escolaRepository;
            _mapper = mapper;
            _escolaService = escolaService;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IEnumerable<EscolaViewModel>> ObterTodos()
        {
            var escolas = _mapper.Map<IEnumerable<EscolaViewModel>>(await _escolaRepository.ObterTodos());
            return escolas;
        }

        [AllowAnonymous]
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<EscolaViewModel>> ObterPorId(Guid id)
        {
            var escola = await _escolaRepository.ObterPorId(id);
            if (escola == null) return NotFound();

            return _mapper.Map<EscolaViewModel>(escola);
        }

        [HttpPost]
        public async Task<ActionResult<EscolaViewModel>> Adicionar(EscolaViewModel escolaViewModel)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _escolaService.Adicionar(_mapper.Map<Business.Models.Escola>(escolaViewModel));

            return CustomResponse(escolaViewModel);
        }

        [HttpPut]
        public async Task<ActionResult<EscolaViewModel>> Atualizar(EscolaViewModel escolaViewModel)
        {
            await _escolaService.Atualizar(_mapper.Map<Business.Models.Escola>(escolaViewModel));

            return CustomResponse(escolaViewModel);
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<EscolaViewModel>> Remover(Guid id)
        {
            var escolaViewModel = await ObterPorId(id);
            if (escolaViewModel == null) return NotFound();

            await _escolaService.Remover(id);

            return CustomResponse();
        }
    }
}
