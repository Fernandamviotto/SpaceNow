using ProjetoSpaceNow.Api.Interfaces.Repository;
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

        public async Task<SalaRecursoModel> GetByIdAsync(int id) =>
            await _repository.GetByIdAsync(id);

        public async Task<SalaRecursoModel> CreateAsync(SalaRecursoModel recurso) =>
            await _repository.CreateAsync(recurso);

        public async Task<SalaRecursoModel> UpdateAsync(SalaRecursoModel recurso) =>
            await _repository.UpdateAsync(recurso);

        public async Task<bool> DeleteAsync(int id) =>
            await _repository.DeleteAsync(id);

        public async Task<IEnumerable<SalaRecursoModel>> GetBySalaIdAsync(int salaId) =>
            await _repository.GetBySalaIdAsync(salaId);
    }
}
