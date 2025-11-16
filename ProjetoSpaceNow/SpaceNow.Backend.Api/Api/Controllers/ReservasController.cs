using Microsoft.AspNetCore.Mvc;
using SpaceNow.Backend.Application.DTOs;
using SpaceNow.Backend.Application.Interfaces;

namespace SpaceNow.Backend.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ReservasController : ControllerBase
{
    private readonly IReservaService _reservaService;

    public ReservasController(IReservaService reservaService)
    {
        _reservaService = reservaService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ReservaDto>>> GetAll()
    {
        var reservas = await _reservaService.GetAllReservasAsync();
        return Ok(reservas);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ReservaDto>> GetById(int id)
    {
        var reserva = await _reservaService.GetReservaByIdAsync(id);
        if (reserva == null)
            return NotFound();
        return Ok(reserva);
    }

    [HttpPost]
    public async Task<ActionResult<ReservaDto>> Create([FromBody] CreateReservaRequest request)
    {
        var reserva = await _reservaService.CreateReservaAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = reserva.Id }, reserva);
    }

    [HttpPost("{id}/aprovar")]
    public async Task<ActionResult<ReservaDto>> Aprovar(int id)
    {
        try
        {
            var reserva = await _reservaService.AprovarReservaAsync(id);
            return Ok(reserva);
        }
        catch (Exception ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpPost("{id}/negar")]
    public async Task<ActionResult<ReservaDto>> Negar(int id)
    {
        try
        {
            var reserva = await _reservaService.NegarReservaAsync(id);
            return Ok(reserva);
        }
        catch (Exception ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpPost("{id}/cancelar")]
    public async Task<ActionResult<ReservaDto>> Cancelar(int id)
    {
        try
        {
            var reserva = await _reservaService.CancelarReservaAsync(id);
            return Ok(reserva);
        }
        catch (Exception ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}
