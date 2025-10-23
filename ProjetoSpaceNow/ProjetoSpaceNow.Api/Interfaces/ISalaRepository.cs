using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Interfaces
{
    public interface ISalaRepository
    {
        Task<IEnumerable<SalaModel>> GetAllAsync();
        Task<SalaModel> GetByIdAsync(Guid id);
        Task<SalaModel> CreateAsync(SalaModel sala);
        Task<SalaModel> UpdateAsync(SalaModel sala);
        Task<bool> DeleteAsync(Guid id);
        Task<IEnumerable<SalaModel>> GetByAndarIdAsync(Guid andarId);
        Task<IEnumerable<SalaModel>> GetByPredioAsync(Guid predioId);
        Task<SalaModel?> GetByNomeAsync(string nome);
        Task<IEnumerable<SalaModel>> GetBySalaTipoIdAsync(Guid salaTipoId);
        Task<IEnumerable<SalaModel>> GetDisponiveisAsync();
    }
}
