using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Interfaces.Repository
{
    public interface ISalaResponsavelRepository
    {
        Task<IEnumerable<SalaResponsavelModel>> GetAllAsync();
        Task<SalaResponsavelModel> GetByIdAsync(int id);
        Task<SalaResponsavelModel> CreateAsync(SalaResponsavelModel responsavel);
        Task<SalaResponsavelModel> UpdateAsync(SalaResponsavelModel responsavel);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<SalaResponsavelModel>> GetBySalaIdAsync(int salaId);
        Task<SalaResponsavelModel> GetByNomeAsync(UsuarioModel usuario);

    }
}
