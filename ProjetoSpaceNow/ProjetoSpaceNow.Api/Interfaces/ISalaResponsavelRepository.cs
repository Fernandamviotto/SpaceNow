using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Interfaces
{
    public interface ISalaResponsavelRepository
    {
        Task<IEnumerable<SalaResponsavelModel>> GetAllAsync();
        Task<SalaResponsavelModel> GetByIdAsync(Guid id);
        Task<SalaResponsavelModel> CreateAsync(SalaResponsavelModel responsavel);
        Task<SalaResponsavelModel> UpdateAsync(SalaResponsavelModel responsavel);
        Task<bool> DeleteAsync(Guid id);
        Task<IEnumerable<SalaResponsavelModel>> GetBySalaIdAsync(Guid salaId);
        Task<SalaResponsavelModel> GetByNomeAsync(UsuarioModel usuario);

    }
}
