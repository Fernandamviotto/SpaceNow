using ProjetoSpaceNow.Api.Interfaces;
using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Services
{
    public class AndarService
    {
        private readonly IAndarRepository _repository;

        public AndarService(IAndarRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<AndarModel>> GetAllAsync() =>
            await _repository.GetAllAsync();

        public async Task<AndarModel> GetByIdAsync(Guid id) =>
            await _repository.GetByIdAsync(id);

        public async Task<AndarModel> CreateAsync(AndarModel andar) =>
            await _repository.CreateAsync(andar);

        public async Task<AndarModel> UpdateAsync(AndarModel andar) =>
            await _repository.UpdateAsync(andar);

        public async Task<bool> DeleteAsync(Guid id) =>
            await _repository.DeleteAsync(id);

        public async Task<IEnumerable<AndarModel>> GetByPredioIdAsync(Guid predioId) =>
            await _repository.GetByPredioIdAsync(predioId);

        public async Task<AndarModel?> GetByNomeAsync(string nome) =>
            await _repository.GetByNomeAsync(nome);
    }
}
