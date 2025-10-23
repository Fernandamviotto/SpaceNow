using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Interfaces
{
    public interface IPredioRepository
    {
        Task<IEnumerable<PredioModel>> GetAllAsync();
        Task<PredioModel> GetByIdAsync(Guid id);
        Task<PredioModel> CreateAsync(PredioModel predio);
        Task<PredioModel> UpdateAsync(PredioModel predio);
        Task<bool> DeleteAsync(Guid id);
        Task<PredioModel> GetByApelidoAsync(string apelido);
    }
}
