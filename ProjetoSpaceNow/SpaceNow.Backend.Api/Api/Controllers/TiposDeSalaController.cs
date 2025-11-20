using Microsoft.AspNetCore.Mvc;
using SpaceNow.Backend.Application.DTOs;
using SpaceNow.Backend.Application.Interfaces;
using SpaceNow.Backend.Domain.Entities;

namespace SpaceNow.Backend.Api.Controllers
{
    [ApiController]
    [Route("salas/tipos")]
    public class TipoSalaController : ControllerBase
    {
        private readonly ITipoSalaRepository _tipoSalaRepository;

        public TipoSalaController(ITipoSalaRepository tipoSalaRepository)
        {
            _tipoSalaRepository = tipoSalaRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoDeSalaDto>>> GetAll()
        {
            var tipos = await _tipoSalaRepository.GetAllAsync();

            var response = tipos.Select(t => new TipoDeSalaDto
            {
                Id = t.Id,
                NomeTipo = t.NomeTipo
            });

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TipoDeSalaDto>> GetById(int id)
        {
            var tipo = await _tipoSalaRepository.GetByIdAsync(id);
            if (tipo == null)
                return NotFound();

            var dto = new TipoDeSalaDto
            {
                Id = tipo.Id,
                NomeTipo = tipo.NomeTipo
            };

            return Ok(dto);
        }
    }
}
