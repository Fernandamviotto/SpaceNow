using Microsoft.AspNetCore.Mvc;
using SpaceNow.Backend.Application.DTOs;
using SpaceNow.Backend.Application.Interfaces;
using SpaceNow.Backend.Domain.Entities;

namespace SpaceNow.Backend.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class SalaController : ControllerBase
{
    private readonly ISalaRepository _salaRepository;
    private readonly ITipoSalaRepository _tipoSalaRepository;

    public SalaController(ISalaRepository salaRepository, ITipoSalaRepository tipoSalaRepository)
    {
        _salaRepository = salaRepository;
        _tipoSalaRepository = tipoSalaRepository;
    }

    [HttpGet("consulta")]
    public async Task<ActionResult<SalaConsultaResponse>> GetConsulta(
    [FromQuery] int pageNumber = 1,
    [FromQuery] int pageSize = 20,
    [FromQuery] bool ativo = true,
    [FromQuery] string? nome = null,
    [FromQuery] int? predioId = null,
    [FromQuery] int? tipoDeSalaId = null)
    {
        var (items, totalCount) = await _salaRepository.GetConsultaAsync(
            pageNumber, pageSize, ativo, nome, predioId, tipoDeSalaId
        );

        return Ok(new SalaConsultaResponse
        {
            Items = items.ToList(),
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        });
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<SalaDto>> GetById(int id)
    {
        var sala = await _salaRepository.GetByIdAsync(id);
        if (sala == null)
            return NotFound();

        var dto = new SalaDto
        {
            SalaId = sala.Id,
            Nome = sala.Nome,
            Capacidade = sala.Capacidade,
            PredioId = sala.PredioId,
            TipoDeSalaId = sala.TipoDeSalaId,
            Status = sala.Status
        };

        return Ok(dto);
    }

    [HttpGet("select")]
    public async Task<ActionResult<IEnumerable<SalaDto>>> GetSelect()
    {
        var salas = await _salaRepository.GetAllAsync(); // ou um método específico para dropdown
        var dtos = salas.Select(s => new SalaDto
        {
            SalaId = s.Id,
            Nome = s.Nome
        }).ToList();

        return Ok(dtos);
    }


    [HttpPost]
    public async Task<ActionResult<SalaDto>> Create([FromBody] CreateSalaRequest request)
    {
        var sala = new Sala
        {
            Nome = request.Nome,
            Capacidade = request.Capacidade,
            PredioId = request.PredioId,
            TipoDeSalaId = request.TipoDeSalaId,
            Status = true
        };

        var created = await _salaRepository.CreateAsync(sala);

        var dto = new SalaDto
        {
            SalaId = created.Id,
            Nome = created.Nome,
            Capacidade = created.Capacidade,
            PredioId = created.PredioId,
            TipoDeSalaId = created.TipoDeSalaId,
            Status = created.Status
        };

        return CreatedAtAction(nameof(GetById), new { id = dto.SalaId }, dto);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<SalaDto>> Update(int id, [FromBody] UpdateSalaRequest request)
    {
        var sala = await _salaRepository.GetByIdAsync(id);
        if (sala == null)
            return NotFound();

        sala.Nome = request.Nome;
        sala.Capacidade = request.Capacidade;
        sala.PredioId = request.PredioId;
        sala.TipoDeSalaId = request.TipoDeSalaId;
        sala.Status = request.Status;

        var updated = await _salaRepository.UpdateAsync(sala);

        var dto = new SalaDto
        {
            SalaId = updated.Id,
            Nome = updated.Nome,
            Capacidade = updated.Capacidade,
            PredioId = updated.PredioId,
            TipoDeSalaId = updated.TipoDeSalaId,
            Status = updated.Status
        };

        return Ok(dto);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _salaRepository.DeleteAsync(id);
        return NoContent();
    }
}
