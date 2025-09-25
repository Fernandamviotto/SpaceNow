using Supabase.Postgrest.Models;

namespace ProjetoSpaceNow.Api.Models
{
    public class Reserva : BaseModel
    {
        public Guid Id { get; set; }
        public Guid SalaId { get; set; }
        public Guid UsuarioId { get; set; }
        public string UsuarioNome { get; set; }
        public string Nome { get; set; }
        public string Tipo { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
    }
}
