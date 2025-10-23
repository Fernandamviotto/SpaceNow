using Microsoft.AspNetCore.Mvc;
using ProjetoSpaceNow.Api.Models;
using ProjetoSpaceNow.Api.Services;

namespace ProjetoSpaceNow.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservaController : ControllerBase { }
    //{
    //    private readonly ReservaService _reservaService;
    //    private readonly SalaService _salaService;

    //    public ReservaController(ReservaService reservaService, SalaService salaService)
    //    {
    //        _reservaService = reservaService;
    //        _salaService = salaService;
    //    }

    //    [HttpGet]
    //    public async Task<IActionResult> GetAll()
    //    {
    //        var reservas = await _reservaService.GetAllAsync();
    //        return Ok(reservas);
    //    }

    //    [HttpGet("{id}")]
    //    public async Task<IActionResult> GetById(Guid id)
    //    {
    //        var reserva = await _reservaService.GetByIdAsync(id);
    //        if (reserva == null)
    //            return NotFound();

    //        return Ok(reserva);
    //    }

    //    [HttpPost]
    //    public async Task<IActionResult> Create([FromBody] ReservaModel reserva)
    //    {
    //        var disponivel = await _reservaService.VerificarDisponibilidadeAsync(reserva);

    //        if (!disponivel)
    //            return BadRequest("A sala não está disponível neste horário.");

    //        var created = await _reservaService.CreateAsync(reserva);
    //        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    //    }

    //    [HttpPut("{id}")]
    //    public async Task<IActionResult> Update(Guid id, [FromBody] ReservaModel reserva)
    //    {
    //        if (id != reserva.Id)
    //            return BadRequest("ID não confere com o objeto informado.");

    //        var updated = await _reservaService.UpdateAsync(reserva);
    //        return Ok(updated);
    //    }

    //    [HttpDelete("{id}")]
    //    public async Task<IActionResult> Delete(Guid id)
    //    {
    //        var success = await _reservaService.DeleteAsync(id);
    //        if (!success)
    //            return NotFound();

    //        return NoContent();
    //    }
    //}
}
