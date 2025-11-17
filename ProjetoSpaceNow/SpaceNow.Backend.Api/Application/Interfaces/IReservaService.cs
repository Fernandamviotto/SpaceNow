using SpaceNow.Backend.Application.DTOs;

namespace SpaceNow.Backend.Application.Interfaces;

public interface IReservaService
{
    Task<IEnumerable<ReservaDto>> GetAllReservasAsync();
    Task<ReservaDto?> GetReservaByIdAsync(int id);
    Task<ReservaDto> CreateReservaAsync(CreateReservaRequest request);
    Task<ReservaDto> AprovarReservaAsync(int id);
    Task<ReservaDto> NegarReservaAsync(int id);
    Task<ReservaDto> CancelarReservaAsync(int id);
}
