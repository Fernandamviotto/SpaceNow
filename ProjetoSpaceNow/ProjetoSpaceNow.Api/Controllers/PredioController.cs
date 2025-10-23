using Microsoft.AspNetCore.Mvc;
using ProjetoSpaceNow.Api.Models;
using ProjetoSpaceNow.Api.Services;
using Supabase;

namespace ProjetoSpaceNow.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PredioController : BaseController<PredioModel>
    {
        private readonly PredioService _service;

        public PredioController(Client client, PredioService service) : base(client)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAll());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var predio = await _service.GetById(id);
            if (predio == null) return NotFound();
            return Ok(predio);
        }

        [HttpPost]
        public async Task<IActionResult> Create(PredioModel predio)
        {
            var created = await _service.Create(predio);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, PredioModel predio)
        {
            if (id == predio.Id)
            {
                var updated = await _service.Update(predio);
                if (updated == null) return NotFound();
                return Ok(updated);
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await _service.Delete(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}