using SpaceNow.Backend.Domain.Entities;

namespace SpaceNow.Backend.Application.Interfaces;

public interface IPredioRepository
{
    Task<IEnumerable<Predio>> GetAllAsync();
    Task<Predio?> GetByResponsavelIdAsync(int responsavelId);
}
