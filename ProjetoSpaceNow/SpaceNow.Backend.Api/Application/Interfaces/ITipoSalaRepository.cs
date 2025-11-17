using SpaceNow.Backend.Domain.Entities;

namespace SpaceNow.Backend.Application.Interfaces;

public interface ITipoSalaRepository
{
    Task<IEnumerable<TipoSala>> GetAllAsync();
    Task<TipoSala?> GetByIdAsync(int id);
}
