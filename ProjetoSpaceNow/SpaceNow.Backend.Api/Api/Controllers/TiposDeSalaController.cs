using Microsoft.AspNetCore.Mvc;
using SpaceNow.Backend.Application.DTOs;
using SpaceNow.Backend.Application.Interfaces;

namespace SpaceNow.Backend.Api.Controllers;

[ApiController]
[Route("tipos-de-sala")]
public class TiposDeSalaController : ControllerBase
{
    private readonly ITipoSalaRepository _tipoSalaRepository;

    public TiposDeSalaController(ITipoSalaRepository tipoSalaRepository)
    {
        _tipoSalaRepository = tipoSalaRepository;
    }

    [HttpGet("listar")]
    public async Task<ActionResult<IEnumerable<TipoDeSalaDto>>> GetAll()
    {
        var tipos = await _tipoSalaRepository.GetAllAsync();
        var dtos = tipos.Select(t => new TipoDeSalaDto
        {
            Id = t.Id,
            NomeTipo = t.NomeTipo
        });
        return Ok(dtos);
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
