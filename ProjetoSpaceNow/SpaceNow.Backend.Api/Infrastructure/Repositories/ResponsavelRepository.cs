using Microsoft.EntityFrameworkCore;
using SpaceNow.Backend.Application.Interfaces;
using SpaceNow.Backend.Domain.Entities;
using SpaceNow.Backend.Infrastructure.Data;

namespace SpaceNow.Backend.Infrastructure.Repositories;

public class ResponsavelRepository : IResponsavelRepository
{
    private readonly ApplicationDbContext _context;

    public ResponsavelRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Responsavel>> GetAllAsync()
    {
        return await _context.Responsaveis.Where(r => r.Ativo).ToListAsync();
    }
}
