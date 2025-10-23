using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Interfaces
{
    public interface ISalaTipoRepository
    {
        Task<IEnumerable<SalaTipoModel>> GetAllAsync();
        Task<SalaTipoModel> GetByIdAsync(Guid id);
        Task<SalaTipoModel> CreateAsync(SalaTipoModel tipo);
        Task<SalaTipoModel> UpdateAsync(SalaTipoModel tipo);
        Task<bool> DeleteAsync(Guid id);
        Task<SalaTipoModel> GetByDescricaoAsync(string descricao);
    }
}
