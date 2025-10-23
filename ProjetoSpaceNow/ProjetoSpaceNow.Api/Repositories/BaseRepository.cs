using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Repositories
{
    public abstract class BaseRepository<TEntity> where TEntity : BaseEntity, new()
    {
        protected readonly Supabase.Client _client;

        public BaseRepository(Supabase.Client client)
        {
            _client = client;
        }

        public virtual async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            var response = await _client.From<TEntity>().Get();
            return response.Models ?? new List<TEntity>();
        }

        public virtual async Task<TEntity> GetByIdAsync(Guid id)
        {
            var response = await _client.From<TEntity>().Where(e => e.Id == id).Single();
            return response;
        }

        public virtual async Task<TEntity> CreateAsync(TEntity entity)
        {
            var response = await _client.From<TEntity>().Insert(entity);
            return response.Models.FirstOrDefault();
        }

        public virtual async Task<TEntity> UpdateAsync(TEntity entity)
        {
            var response = await _client.From<TEntity>().Update(entity);
            return response.Models.FirstOrDefault();
        }

        public virtual async Task<bool> DeleteAsync(Guid id)
        {
            await _client.From<TEntity>().Where(e => e.Id == id).Delete();
            return true;
        }
    }
}
