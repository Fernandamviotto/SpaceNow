using ProjetoSpaceNow.Api.Interfaces;
using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Services
{
    public class SalaService
    {
        private readonly ISalaRepository _repository;

        public SalaService(ISalaRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<SalaModel>> GetAllAsync() =>
            await _repository.GetAllAsync();

        public async Task<SalaModel> GetByIdAsync(Guid id) =>
            await _repository.GetByIdAsync(id);

        public async Task<SalaModel> CreateAsync(SalaModel sala) =>
            await _repository.CreateAsync(sala);

        public async Task<SalaModel> UpdateAsync(SalaModel sala) =>
            await _repository.UpdateAsync(sala);

        public async Task<bool> DeleteAsync(Guid id) =>
            await _repository.DeleteAsync(id);

        public async Task<IEnumerable<SalaModel>> GetByAndarIdAsync(Guid andarId) =>
            await _repository.GetByAndarIdAsync(andarId);

        public async Task<IEnumerable<SalaModel>> GetByPredioAsync(Guid predioId) =>
            await _repository.GetByPredioAsync(predioId);

        public async Task<SalaModel?> GetByNomeAsync(string nome) =>
            await _repository.GetByNomeAsync(nome);

        public async Task<IEnumerable<SalaModel>> GetBySalaTipoIdAsync(Guid salaTipoId) =>
            await _repository.GetBySalaTipoIdAsync(salaTipoId);

        public async Task<IEnumerable<SalaModel>> GetDisponiveisAsync() =>
            await _repository.GetDisponiveisAsync();
    }
}
