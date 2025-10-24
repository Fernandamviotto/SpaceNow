using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Interfaces.Repository
{
    public interface IAndarRepository
    {
        Task<IEnumerable<AndarModel>> GetAllAsync();
        Task<AndarModel> GetByIdAsync(int id);
        Task<AndarModel> CreateAsync(AndarModel andar);
        Task<AndarModel> UpdateAsync(AndarModel andar);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<AndarModel>> GetByPredioIdAsync(int predioId);
        Task<AndarModel?> GetByNomeAsync(string nome);
    }
}
