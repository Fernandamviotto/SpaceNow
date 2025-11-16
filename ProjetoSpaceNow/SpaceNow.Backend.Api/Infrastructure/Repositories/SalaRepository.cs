using Microsoft.EntityFrameworkCore;
using SpaceNow.Backend.Application.Interfaces;
using SpaceNow.Backend.Domain.Entities;
using SpaceNow.Backend.Infrastructure.Data;

namespace SpaceNow.Backend.Infrastructure.Repositories;

public class SalaRepository : ISalaRepository
{
    private readonly ApplicationDbContext _context;

    public SalaRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<(IEnumerable<Sala> Items, int TotalCount)> GetConsultaAsync(
        int pageNumber, 
        int pageSize, 
        bool? ativo = null,
        string? nome = null,
        int? predioId = null,
        int? tipoDeSalaId = null)
    {
        var query = _context.Salas.AsQueryable();

        if (ativo.HasValue)
            query = query.Where(s => s.Status == ativo.Value);

        if (!string.IsNullOrEmpty(nome))
            query = query.Where(s => s.Nome.Contains(nome));

        if (predioId.HasValue)
            query = query.Where(s => s.PredioId == predioId.Value);

        if (tipoDeSalaId.HasValue)
            query = query.Where(s => s.TipoDeSalaId == tipoDeSalaId.Value);

        var totalCount = await query.CountAsync();
        var items = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }

    public async Task<Sala?> GetByIdAsync(int id)
    {
        return await _context.Salas.FindAsync(id);
    }

    public async Task<Sala> CreateAsync(Sala sala)
    {
        sala.CreatedAt = DateTime.UtcNow;
        _context.Salas.Add(sala);
        await _context.SaveChangesAsync();
        return sala;
    }

    public async Task<Sala> UpdateAsync(Sala sala)
    {
        sala.UpdatedAt = DateTime.UtcNow;
        _context.Salas.Update(sala);
        await _context.SaveChangesAsync();
        return sala;
    }

    public async Task DeleteAsync(int id)
    {
        var sala = await _context.Salas.FindAsync(id);
        if (sala != null)
        {
            sala.Status = false;
            sala.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }
}
