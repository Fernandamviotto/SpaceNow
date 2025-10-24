using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Interfaces.Repository
{
    public interface ISalaTipoRepository
    {
        Task<IEnumerable<SalaTipoModel>> GetAllAsync();
        Task<SalaTipoModel> GetByIdAsync(int id);
        Task<SalaTipoModel> CreateAsync(SalaTipoModel tipo);
        Task<SalaTipoModel> UpdateAsync(SalaTipoModel tipo);
        Task<bool> DeleteAsync(int id);
        Task<SalaTipoModel> GetByDescricaoAsync(string descricao);
    }
}
