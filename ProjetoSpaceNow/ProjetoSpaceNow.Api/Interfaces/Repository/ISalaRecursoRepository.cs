using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Interfaces.Repository
{
    public interface ISalaRecursoRepository
    {
        Task<IEnumerable<SalaRecursoModel>> GetAllAsync();
        Task<SalaRecursoModel> GetByIdAsync(int id);
        Task<SalaRecursoModel> CreateAsync(SalaRecursoModel recurso);
        Task<SalaRecursoModel> UpdateAsync(SalaRecursoModel recurso);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<SalaRecursoModel>> GetBySalaIdAsync(int salaId);
    }
}
