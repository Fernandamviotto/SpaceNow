using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Interfaces
{
    public interface IAndarRepository
    {
        Task<IEnumerable<AndarModel>> GetAllAsync();
        Task<AndarModel> GetByIdAsync(Guid id);
        Task<AndarModel> CreateAsync(AndarModel andar);
        Task<AndarModel> UpdateAsync(AndarModel andar);
        Task<bool> DeleteAsync(Guid id);
        Task<IEnumerable<AndarModel>> GetByPredioIdAsync(Guid predioId);
        Task<AndarModel?> GetByNomeAsync(string nome);
    }
}
