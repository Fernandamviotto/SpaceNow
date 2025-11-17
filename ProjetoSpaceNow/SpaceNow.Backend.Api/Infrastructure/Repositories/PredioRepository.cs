using Microsoft.EntityFrameworkCore;
using SpaceNow.Backend.Application.Interfaces;
using SpaceNow.Backend.Domain.Entities;
using SpaceNow.Backend.Infrastructure.Data;

namespace SpaceNow.Backend.Infrastructure.Repositories;

public class PredioRepository : IPredioRepository
{
    private readonly ApplicationDbContext _context;

    public PredioRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Predio>> GetAllAsync()
    {
        return await _context.Predios.ToListAsync();
    }

    public async Task<Predio?> GetByResponsavelIdAsync(int responsavelId)
    {
        return await _context.Predios.FirstOrDefaultAsync();
    }
}
