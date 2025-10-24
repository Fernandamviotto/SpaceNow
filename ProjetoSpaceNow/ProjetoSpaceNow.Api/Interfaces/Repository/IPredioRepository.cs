using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Interfaces.Repository
{
    public interface IPredioRepository
    {
        Task<IEnumerable<PredioModel>> GetAllAsync();
        Task<PredioModel> GetByIdAsync(int id);
        Task<PredioModel> CreateAsync(PredioModel predio);
        Task<PredioModel> UpdateAsync(PredioModel predio);
        Task<bool> DeleteAsync(int id);
        Task<PredioModel> GetByApelidoAsync(string apelido);
    }
}
