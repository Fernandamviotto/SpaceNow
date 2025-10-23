using Microsoft.AspNetCore.Mvc;
using ProjetoSpaceNow.Api.Models;
using ProjetoSpaceNow.Api.Services;

namespace ProjetoSpaceNow.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalasController : ControllerBase
    {
        private readonly SalaService _service;

        public SalasController(SalaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var salas = await _service.GetAll();
            return Ok(salas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var sala = await _service.GetById(id);
            if (sala == null) return NotFound();
            return Ok(sala);
        }

        [HttpPost]
        public async Task<IActionResult> Create(SalaModel sala)
        {
            var created = await _service.Create(sala);
            return CreatedAtAction(nameof(GetById), new { id = created.SalaId }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, SalaModel sala)
        {
            if (id != sala.SalaId) return BadRequest();
            var updated = await _service.Update(sala);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.Delete(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
