using SpaceNow.Backend.Domain.Entities;

namespace SpaceNow.Backend.Application.Interfaces;

public interface ISalaRepository
{
    Task<(IEnumerable<Sala> Items, int TotalCount)> GetConsultaAsync(
        int pageNumber, 
        int pageSize, 
        bool? ativo = null,
        string? nome = null,
        int? predioId = null,
        int? tipoDeSalaId = null);
    Task<Sala?> GetByIdAsync(int id);
    Task<Sala> CreateAsync(Sala sala);
    Task<Sala> UpdateAsync(Sala sala);
    Task DeleteAsync(int id);
}
