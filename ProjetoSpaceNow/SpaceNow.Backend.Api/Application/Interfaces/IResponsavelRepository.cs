using SpaceNow.Backend.Domain.Entities;

namespace SpaceNow.Backend.Application.Interfaces;

public interface IResponsavelRepository
{
    Task<IEnumerable<Responsavel>> GetAllAsync();
}
