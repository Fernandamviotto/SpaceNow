using ProjetoSpaceNow.Api.Models;
using ProjetoSpaceNow.Api.Models.Enums;

namespace ProjetoSpaceNow.Api.Interfaces
{
    public interface ISalaDisponibilidadeRepository
    {
        Task<IEnumerable<SalaDisponibilidadeModel>> GetAllAsync();
        Task<SalaDisponibilidadeModel> GetByIdAsync(Guid id);
        Task<SalaDisponibilidadeModel> CreateAsync(SalaDisponibilidadeModel disponibilidade);
        Task<SalaDisponibilidadeModel> UpdateAsync(SalaDisponibilidadeModel disponibilidade);
        Task<bool> DeleteAsync(Guid id);
        Task<IEnumerable<SalaDisponibilidadeModel>> GetBySalaIdAsync(Guid salaId);
        Task<IEnumerable<SalaDisponibilidadeModel>> GetByDiaSemanaAsync(DiaSemanaEnum dia);
        Task<IEnumerable<SalaDisponibilidadeModel>> GetDisponiveisAsync(Guid salaId, TimeSpan inicio, TimeSpan fim, DiaSemanaEnum dia);
    }
}
