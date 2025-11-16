using SpaceNow.Backend.Domain.Entities;

namespace SpaceNow.Backend.Application.Interfaces;

public interface IJwtProvider
{
    string GenerateToken(User user);
}
