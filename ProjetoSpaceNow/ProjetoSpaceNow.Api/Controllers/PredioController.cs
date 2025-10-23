using Microsoft.AspNetCore.Mvc;
using ProjetoSpaceNow.Api.Models;
using ProjetoSpaceNow.Api.Services;

namespace ProjetoSpaceNow.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PredioController : BaseController<PredioModel>
    {
        private readonly PredioService _service;

        public PredioController(PredioService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAll());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var predio = await _service.GetById(id);
            if (predio == null) return NotFound();
            return Ok(predio);
        }

        [HttpPost]
        public async Task<IActionResult> Create(PredioModel predio)
        {
            var created = await _service.Create(predio);
            return CreatedAtAction(nameof(GetById), new { id = created.PredioId }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, PredioModel predio)
        {
            if (id != predio.PredioId) return BadRequest();
            var updated = await _service.Update(predio);
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
