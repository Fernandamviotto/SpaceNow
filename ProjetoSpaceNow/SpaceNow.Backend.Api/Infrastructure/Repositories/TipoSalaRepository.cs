using Microsoft.EntityFrameworkCore;
using SpaceNow.Backend.Application.Interfaces;
using SpaceNow.Backend.Domain.Entities;
using SpaceNow.Backend.Infrastructure.Data;

namespace SpaceNow.Backend.Infrastructure.Repositories;

public class TipoSalaRepository : ITipoSalaRepository
{
    private readonly ApplicationDbContext _context;

    public TipoSalaRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TipoSala>> GetAllAsync()
    {
        return await _context.TiposSala.ToListAsync();
    }

    public async Task<TipoSala?> GetByIdAsync(int id)
    {
        return await _context.TiposSala.FindAsync(id);
    }
}
