using ProjetoSpaceNow.Api.Interfaces;
using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Services
{
    public class PredioService
    {
        private readonly IPredioRepository _repository;

        public PredioService(IPredioRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<PredioModel>> GetAllAsync() =>
            await _repository.GetAllAsync();

        public async Task<PredioModel> GetByIdAsync(Guid id) =>
            await _repository.GetByIdAsync(id);

        public async Task<PredioModel> CreateAsync(PredioModel predio) =>
            await _repository.CreateAsync(predio);

        public async Task<PredioModel> UpdateAsync(PredioModel predio) =>
            await _repository.UpdateAsync(predio);

        public async Task<bool> DeleteAsync(Guid id) =>
            await _repository.DeleteAsync(id);

        public async Task<PredioModel> GetByApelidoAsync(string apelido) =>
            await _repository.GetByApelidoAsync(apelido);
    }
}
