using ProjetoSpaceNow.Api.Interfaces;
using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Services
{
    public class SalaRecursoService
    {
        private readonly ISalaRecursoRepository _repository;

        public SalaRecursoService(ISalaRecursoRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<SalaRecursoModel>> GetAllAsync() =>
            await _repository.GetAllAsync();

        public async Task<SalaRecursoModel> GetByIdAsync(Guid id) =>
            await _repository.GetByIdAsync(id);

        public async Task<SalaRecursoModel> CreateAsync(SalaRecursoModel recurso) =>
            await _repository.CreateAsync(recurso);

        public async Task<SalaRecursoModel> UpdateAsync(SalaRecursoModel recurso) =>
            await _repository.UpdateAsync(recurso);

        public async Task<bool> DeleteAsync(Guid id) =>
            await _repository.DeleteAsync(id);

        public async Task<IEnumerable<SalaRecursoModel>> GetBySalaIdAsync(Guid salaId) =>
            await _repository.GetBySalaIdAsync(salaId);
    }
}
