using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Interfaces
{
    public interface ISalaRecursoRepository
    {
        Task<IEnumerable<SalaRecursoModel>> GetAllAsync();
        Task<SalaRecursoModel> GetByIdAsync(Guid id);
        Task<SalaRecursoModel> CreateAsync(SalaRecursoModel recurso);
        Task<SalaRecursoModel> UpdateAsync(SalaRecursoModel recurso);
        Task<bool> DeleteAsync(Guid id);
        Task<IEnumerable<SalaRecursoModel>> GetBySalaIdAsync(Guid salaId);
    }
}
