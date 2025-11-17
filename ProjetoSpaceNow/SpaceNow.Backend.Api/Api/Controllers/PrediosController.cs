using Microsoft.AspNetCore.Mvc;
using SpaceNow.Backend.Application.DTOs;
using SpaceNow.Backend.Application.Interfaces;

namespace SpaceNow.Backend.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class PrediosController : ControllerBase
{
    private readonly IPredioRepository _predioRepository;

    public PrediosController(IPredioRepository predioRepository)
    {
        _predioRepository = predioRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PredioDto>>> GetAll()
    {
        var predios = await _predioRepository.GetAllAsync();
        var dtos = predios.Select(p => new PredioDto
        {
            Id = p.Id,
            Nome = p.Nome,
            Endereco = p.Endereco
        });
        return Ok(dtos);
    }

    [HttpGet("responsavel/{id}")]
    public async Task<ActionResult<PredioDto>> GetByResponsavel(int id)
    {
        var predio = await _predioRepository.GetByResponsavelIdAsync(id);
        if (predio == null)
            return NotFound();

        var dto = new PredioDto
        {
            Id = predio.Id,
            Nome = predio.Nome,
            Endereco = predio.Endereco
        };

        return Ok(dto);
    }
}
