using SpaceNow.Backend.Application.DTOs;
using SpaceNow.Backend.Application.Interfaces;
using SpaceNow.Backend.Domain.Entities;
using SpaceNow.Backend.Domain.Enums;

namespace SpaceNow.Backend.Application.Services;

public class ReservaService : IReservaService
{
    private readonly IReservaRepository _reservaRepository;

    public ReservaService(IReservaRepository reservaRepository)
    {
        _reservaRepository = reservaRepository;
    }

    public async Task<IEnumerable<ReservaDto>> GetAllReservasAsync()
    {
        var reservas = await _reservaRepository.GetAllAsync();
        return reservas.Select(MapToDto);
    }

    public async Task<ReservaDto?> GetReservaByIdAsync(int id)
    {
        var reserva = await _reservaRepository.GetByIdAsync(id);
        return reserva != null ? MapToDto(reserva) : null;
    }

    public async Task<ReservaDto> CreateReservaAsync(CreateReservaRequest request)
    {
        // Converte string → enum
        if (!Enum.TryParse<ReservaTipoEnum>(request.Tipo, true, out var tipoEnum))
            throw new ArgumentException($"Tipo inválido: {request.Tipo}");

        var reserva = new Reserva
        {
            SalaId = request.SalaId,
            Sala = request.Sala,

            Tipo = tipoEnum, // <─ ENUM OK

            Solicitante = request.Solicitante,

            // Sem conversão:
            DataInicio = request.DataInicio, // string
            DataFim = request.DataFim,       // string

            Status = "Pendente",
            QuantidadePessoas = request.QuantidadePessoas,
            CreatedAt = DateTime.UtcNow
        };

        var created = await _reservaRepository.CreateAsync(reserva);
        return MapToDto(created);
    }




    public async Task<ReservaDto> AprovarReservaAsync(int id)
    {
        var reserva = await _reservaRepository.GetByIdAsync(id);
        if (reserva == null) throw new Exception("Reserva não encontrada");

        reserva.Status = "Aprovada";
        reserva.UpdatedAt = DateTime.UtcNow;
        
        var updated = await _reservaRepository.UpdateAsync(reserva);
        return MapToDto(updated);
    }

    public async Task<ReservaDto> NegarReservaAsync(int id)
    {
        var reserva = await _reservaRepository.GetByIdAsync(id);
        if (reserva == null) throw new Exception("Reserva não encontrada");

        reserva.Status = "Negada";
        reserva.UpdatedAt = DateTime.UtcNow;
        
        var updated = await _reservaRepository.UpdateAsync(reserva);
        return MapToDto(updated);
    }

    public async Task<ReservaDto> CancelarReservaAsync(int id)
    {
        var reserva = await _reservaRepository.GetByIdAsync(id);
        if (reserva == null) throw new Exception("Reserva não encontrada");

        reserva.Status = "Cancelada";
        reserva.UpdatedAt = DateTime.UtcNow;
        
        var updated = await _reservaRepository.UpdateAsync(reserva);
        return MapToDto(updated);
    }

    private static ReservaDto MapToDto(Reserva reserva)
    {
        return new ReservaDto
        {
            Id = reserva.Id,
            Sala = reserva.Sala,

            Tipo = reserva.Tipo.ToString(),

            Solicitante = reserva.Solicitante,
            DataInicio = reserva.DataInicio, 
            DataFim = reserva.DataFim, 
            Status = reserva.Status,
            QuantidadePessoas = reserva.QuantidadePessoas
        };
    }


}
