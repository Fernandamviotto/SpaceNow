using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Interfaces.Repository
{
    public interface ISalaRepository
    {
        Task<IEnumerable<SalaModel>> GetAllAsync();
        Task<SalaModel> GetByIdAsync(int id);
        Task<SalaModel> CreateAsync(SalaModel sala);
        Task<SalaModel> UpdateAsync(SalaModel sala);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<SalaModel>> GetByAndarIdAsync(int andarId);
        Task<IEnumerable<SalaModel>> GetByPredioAsync(int predioId);
        Task<SalaModel?> GetByNomeAsync(string nome);
        Task<IEnumerable<SalaModel>> GetBySalaTipoIdAsync(int salaTipoId);
        Task<IEnumerable<SalaModel>> GetDisponiveisAsync();
    }
}
