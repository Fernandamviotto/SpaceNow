using ProjetoSpaceNow.Api.Interfaces;
using ProjetoSpaceNow.Api.Models;
using ProjetoSpaceNow.Api.Models.Enums;

namespace ProjetoSpaceNow.Api.Services
{
    public class SalaDisponibilidadeService
    {
        private readonly ISalaDisponibilidadeRepository _repository;

        public SalaDisponibilidadeService(ISalaDisponibilidadeRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<SalaDisponibilidadeModel>> GetAllAsync() =>
            await _repository.GetAllAsync();

        public async Task<SalaDisponibilidadeModel> GetByIdAsync(Guid id) =>
            await _repository.GetByIdAsync(id);

        public async Task<SalaDisponibilidadeModel> CreateAsync(SalaDisponibilidadeModel disponibilidade) =>
            await _repository.CreateAsync(disponibilidade);

        public async Task<SalaDisponibilidadeModel> UpdateAsync(SalaDisponibilidadeModel disponibilidade) =>
            await _repository.UpdateAsync(disponibilidade);

        public async Task<bool> DeleteAsync(Guid id) =>
            await _repository.DeleteAsync(id);

        public async Task<IEnumerable<SalaDisponibilidadeModel>> GetBySalaIdAsync(Guid salaId) =>
            await _repository.GetBySalaIdAsync(salaId);

        public async Task<IEnumerable<SalaDisponibilidadeModel>> GetByDiaSemanaAsync(DiaSemanaEnum dia) =>
            await _repository.GetByDiaSemanaAsync(dia);

        public async Task<IEnumerable<SalaDisponibilidadeModel>> GetDisponiveisAsync(Guid salaId, TimeSpan inicio, TimeSpan fim, DiaSemanaEnum dia) =>
            await _repository.GetDisponiveisAsync(salaId, inicio, fim, dia);
    }
}
