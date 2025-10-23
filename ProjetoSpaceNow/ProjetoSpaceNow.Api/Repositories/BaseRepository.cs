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
            return await _client.From<TEntity>().Get();
        }

        public virtual async Task<TEntity> GetByIdAsync(Guid id)
        {
            var response = await _client.From<TEntity>().Where(e => e.Id == id).Single();
            return response;
        }

        public virtual async Task<TEntity> CreateAsync(TEntity entity)
        {
            return await _client.From<TEntity>().Insert(entity);
        }

        public virtual async Task<TEntity> UpdateAsync(TEntity entity)
        {
            return await _client.From<TEntity>().Update(entity);
        }

        public virtual async Task<bool> DeleteAsync(Guid id)
        {
            var response = await _client.From<TEntity>().Where(e => e.Id == id).Delete();
            return response != null;
        }
    }
}
