namespace ProjetoSpaceNow.Api.DTO
{
    public class HomeDto
    {
        public UsuarioDTO Usuario { get; set; }
        public IEnumerable<SalaDto> Salas { get; set; }
        public IEnumerable<ReservaDto> Reservas { get; set; }
    }
}
