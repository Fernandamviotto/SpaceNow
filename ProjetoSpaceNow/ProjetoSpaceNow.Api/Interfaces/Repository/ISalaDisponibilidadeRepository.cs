using ProjetoSpaceNow.Api.Models;
using ProjetoSpaceNow.Api.Models.Enums;

namespace ProjetoSpaceNow.Api.Interfaces.Repository
{
    public interface ISalaDisponibilidadeRepository
    {
        Task<IEnumerable<SalaDisponibilidadeModel>> GetAllAsync();
        Task<SalaDisponibilidadeModel> GetByIdAsync(int id);
        Task<SalaDisponibilidadeModel> CreateAsync(SalaDisponibilidadeModel disponibilidade);
        Task<SalaDisponibilidadeModel> UpdateAsync(SalaDisponibilidadeModel disponibilidade);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<SalaDisponibilidadeModel>> GetBySalaIdAsync(int salaId);
        Task<IEnumerable<SalaDisponibilidadeModel>> GetByDiaSemanaAsync(DiaSemanaEnum dia);
        Task<IEnumerable<SalaDisponibilidadeModel>> GetDisponiveisAsync(int salaId, TimeSpan inicio, TimeSpan fim, DiaSemanaEnum dia);
    }
}
