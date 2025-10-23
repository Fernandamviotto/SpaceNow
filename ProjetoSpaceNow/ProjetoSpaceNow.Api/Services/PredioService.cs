using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Services
{
    public class PredioService : IBaseService<PredioModel>
    {
        private readonly List<PredioModel> _predios = new();

        public Task<PredioModel> Create(PredioModel entity)
        {
            entity.Id = Guid.NewGuid(); 
            _predios.Add(entity);
            return Task.FromResult(entity);
        }

        public Task<bool> Delete(int id)
        {
            var item = _predios.FirstOrDefault(p => p.Id.GetHashCode() == id);
            if (item == null) return Task.FromResult(false);
            _predios.Remove(item);
            return Task.FromResult(true);
        }

        public Task<IEnumerable<PredioModel>> GetAll()
        {
            return Task.FromResult<IEnumerable<PredioModel>>(_predios);
        }

        public Task<PredioModel> GetById(int id)
        {
            var item = _predios.FirstOrDefault(p => p.Id.GetHashCode() == id);
            return Task.FromResult(item);
        }

        public Task<PredioModel> Update(PredioModel entity)
        {
            var existing = _predios.FirstOrDefault(p => p.Id == entity.Id);
            if (existing == null) return Task.FromResult<PredioModel>(null);

            existing.Apelido = entity.Apelido;
            return Task.FromResult(existing);
        }
    }
}
