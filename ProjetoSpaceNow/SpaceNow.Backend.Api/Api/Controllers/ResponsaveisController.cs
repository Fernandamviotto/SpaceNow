using Microsoft.AspNetCore.Mvc;
using SpaceNow.Backend.Application.DTOs;
using SpaceNow.Backend.Application.Interfaces;

namespace SpaceNow.Backend.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ResponsaveisController : ControllerBase
{
    private readonly IResponsavelRepository _responsavelRepository;

    public ResponsaveisController(IResponsavelRepository responsavelRepository)
    {
        _responsavelRepository = responsavelRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ResponsavelDto>>> GetAll()
    {
        var responsaveis = await _responsavelRepository.GetAllAsync();
        var dtos = responsaveis.Select(r => new ResponsavelDto
        {
            Id = r.Id,
            Nome = r.Nome,
            Email = r.Email,
            Telefone = r.Telefone,
            Cargo = r.Cargo,
            Ativo = r.Ativo
        });
        return Ok(dtos);
    }
}
