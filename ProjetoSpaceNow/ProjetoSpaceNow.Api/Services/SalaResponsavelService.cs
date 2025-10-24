using ProjetoSpaceNow.Api.Interfaces.Repository;
using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Services
{
    public class SalaResponsavelService
    {
        private readonly ISalaResponsavelRepository _repository;

        public SalaResponsavelService(ISalaResponsavelRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<SalaResponsavelModel>> GetAllAsync() =>
            await _repository.GetAllAsync();

        public async Task<SalaResponsavelModel> GetByIdAsync(int id) =>
            await _repository.GetByIdAsync(id);

        public async Task<SalaResponsavelModel> CreateAsync(SalaResponsavelModel responsavel) =>
            await _repository.CreateAsync(responsavel);

        public async Task<SalaResponsavelModel> UpdateAsync(SalaResponsavelModel responsavel) =>
            await _repository.UpdateAsync(responsavel);

        public async Task<bool> DeleteAsync(int id) =>
            await _repository.DeleteAsync(id);

        public async Task<IEnumerable<SalaResponsavelModel>> GetBySalaIdAsync(int salaId) =>
            await _repository.GetBySalaIdAsync(salaId);

        public async Task<SalaResponsavelModel> GetByNomeAsync(UsuarioModel usuario) =>
            await _repository.GetByNomeAsync(usuario);
    }
}
