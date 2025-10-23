using Microsoft.AspNetCore.Mvc;
using ProjetoSpaceNow.Api.Models;
using ProjetoSpaceNow.Api.Services;

namespace ProjetoSpaceNow.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalaController : ControllerBase
    {
        private readonly SalaService _salaService;
        private readonly SalaDisponibilidadeService _disponibilidadeService;
        private readonly SalaRecursoService _recursoService;
        private readonly SalaResponsavelService _responsavelService;
        private readonly SalaTipoService _tipoService;

        public SalaController(
            SalaService salaService,
            SalaDisponibilidadeService disponibilidadeService,
            SalaRecursoService recursoService,
            SalaResponsavelService responsavelService,
            SalaTipoService tipoService)
        {
            _salaService = salaService;
            _disponibilidadeService = disponibilidadeService;
            _recursoService = recursoService;
            _responsavelService = responsavelService;
            _tipoService = tipoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var salas = await _salaService.GetAllAsync();
            return Ok(salas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var sala = await _salaService.GetByIdAsync(id);
            if (sala == null)
                return NotFound();
            return Ok(sala);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SalaModel sala)
        {
            var created = await _salaService.CreateAsync(sala);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] SalaModel sala)
        {
            if (id != sala.Id)
                return BadRequest("ID não confere com o objeto informado.");

            var updated = await _salaService.UpdateAsync(sala);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await _salaService.DeleteAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpGet("{id}/disponibilidade")]
        public async Task<IActionResult> GetDisponibilidade(Guid id)
        {
            var disponibilidade = await _disponibilidadeService.GetBySalaIdAsync(id);
            return Ok(disponibilidade);
        }

        [HttpGet("{id}/recursos")]
        public async Task<IActionResult> GetRecursos(Guid id)
        {
            var recursos = await _recursoService.GetBySalaIdAsync(id);
            return Ok(recursos);
        }

        [HttpGet("{id}/responsaveis")]
        public async Task<IActionResult> GetResponsaveis(Guid id)
        {
            var responsaveis = await _responsavelService.GetBySalaIdAsync(id);
            return Ok(responsaveis);
        }
    }
}
