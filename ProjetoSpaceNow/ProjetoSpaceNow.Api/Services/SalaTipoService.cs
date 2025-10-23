using ProjetoSpaceNow.Api.Interfaces;
using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Services
{
    public class SalaTipoService
    {
        private readonly ISalaTipoRepository _repository;

        public SalaTipoService(ISalaTipoRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<SalaTipoModel>> GetAllAsync() =>
            await _repository.GetAllAsync();

        public async Task<SalaTipoModel> GetByIdAsync(Guid id) =>
            await _repository.GetByIdAsync(id);

        public async Task<SalaTipoModel> CreateAsync(SalaTipoModel tipo) =>
            await _repository.CreateAsync(tipo);

        public async Task<SalaTipoModel> UpdateAsync(SalaTipoModel tipo) =>
            await _repository.UpdateAsync(tipo);

        public async Task<bool> DeleteAsync(Guid id) =>
            await _repository.DeleteAsync(id);

        public async Task<SalaTipoModel> GetByDescricaoAsync(string descricao) =>
            await _repository.GetByDescricaoAsync(descricao);
    }
}
