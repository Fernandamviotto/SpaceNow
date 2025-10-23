using ProjetoSpaceNow.Api.DTO;
using ProjetoSpaceNow.Api.Repositories;

namespace ProjetoSpaceNow.Api.Services
{
    public class HomeService
    {
        private readonly UsuarioRepository _userRepo;
        private readonly SalaRepository _salaRepo;
        private readonly ReservaRepository _reservaRepo;

        public HomeService(UsuarioRepository userRepo, SalaRepository salaRepo, ReservaRepository reservaRepo)
        {
            _userRepo = userRepo;
            _salaRepo = salaRepo;
            _reservaRepo = reservaRepo;
        }

        public async Task<UsuarioDTO> GetUser(Guid id)
        {
            var user = await _userRepo.GetUserById(id);
            return new UsuarioDTO
            {
                Nome = user.Nome,
                Email = user.Email,
                Perfil = user.Perfil.ToString(), 
            };
        }

        public async Task<IEnumerable<SalaDto>> GetSalas()
        {
            var salas = await _salaRepo.GetAllAsync();
            return salas.Select(s => new SalaDto
            {
                Nome = s.TableName,
                Capacidade = s.Capacidade,
                Recursos = s.Recursos != null
                    ? string.Join(", ", s.Recursos.Select(r => r.Nome))
                    : string.Empty,
            });
        }

        public async Task<IEnumerable<ReservaDto>> GetReservas(DateTime data, string periodo)
        {
            var reservas = await _reservaRepo.GetReservas(data);
            var salas = await _salaRepo.GetAllAsync();

            return reservas.Select(r => new ReservaDto
            {
                SalaNome = salas.FirstOrDefault(s => s.Id == r.SalaId)?.Apelido ?? "SalaModel desconhecida",
                UsuarioNome = r.Usuario.Nome,
                Nome = r.Usuario.Nome,
                Tipo = r.TipoReserva.ToString(),
                Hora = r.DataInicio.ToString("HH:mm"),
                Periodo = periodo,
                Data = r.DataInicio.Date
            });
        }
    }
}
