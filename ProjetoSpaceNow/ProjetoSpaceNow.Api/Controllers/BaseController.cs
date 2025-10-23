using Microsoft.AspNetCore.Mvc;
using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class BaseController<TEntity> : ControllerBase
        where TEntity : BaseEntity, new()
    {
        protected readonly Supabase.Client _client;

        public BaseController(Supabase.Client client)
        {
            _client = client;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TEntity>>> GetAll()
        {
            var response = await _client.From<TEntity>().Get();
            return Ok(response.Models);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TEntity>> GetById(Guid id)
        {
            var response = await _client.From<TEntity>().Where(x => x.Id == id).Get();
            var entity = response.Models.Count > 0 ? response.Models[0] : null;

            if (entity == null) return NotFound();
            return Ok(entity);
        }

        [HttpPost]
        public async Task<ActionResult<TEntity>> Create([FromBody] TEntity entity)
        {
            entity.DataCriacao = DateTime.UtcNow;
            var response = await _client.From<TEntity>().Insert(entity);
            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TEntity>> Update(Guid id, [FromBody] TEntity entity)
        {
            var response = await _client.From<TEntity>().Where(x => x.Id == id).Update(entity);
            return Ok(entity);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            await _client.From<TEntity>().Where(x => x.Id == id).Delete();
            return NoContent();
        }
    }
}
