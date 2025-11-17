using SpaceNow.Backend.Domain.Entities;

namespace SpaceNow.Backend.Application.Interfaces;

public interface IReservaRepository
{
    Task<IEnumerable<Reserva>> GetAllAsync();
    Task<Reserva?> GetByIdAsync(int id);
    Task<Reserva> CreateAsync(Reserva reserva);
    Task<Reserva> UpdateAsync(Reserva reserva);
    Task DeleteAsync(int id);
}
