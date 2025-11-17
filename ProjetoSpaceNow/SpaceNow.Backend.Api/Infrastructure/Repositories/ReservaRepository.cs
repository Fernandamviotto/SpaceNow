using Microsoft.EntityFrameworkCore;
using SpaceNow.Backend.Application.Interfaces;
using SpaceNow.Backend.Domain.Entities;
using SpaceNow.Backend.Infrastructure.Data;

namespace SpaceNow.Backend.Infrastructure.Repositories;

public class ReservaRepository : IReservaRepository
{
    private readonly ApplicationDbContext _context;

    public ReservaRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Reserva>> GetAllAsync()
    {
        return await _context.Reservas.ToListAsync();
    }

    public async Task<Reserva?> GetByIdAsync(int id)
    {
        return await _context.Reservas.FindAsync(id);
    }

    public async Task<Reserva> CreateAsync(Reserva reserva)
    {
        _context.Reservas.Add(reserva);
        await _context.SaveChangesAsync();
        return reserva;
    }

    public async Task<Reserva> UpdateAsync(Reserva reserva)
    {
        _context.Reservas.Update(reserva);
        await _context.SaveChangesAsync();
        return reserva;
    }

    public async Task DeleteAsync(int id)
    {
        var reserva = await _context.Reservas.FindAsync(id);
        if (reserva != null)
        {
            _context.Reservas.Remove(reserva);
            await _context.SaveChangesAsync();
        }
    }
}
