using Supabase.Postgrest.Models;

namespace ProjetoSpaceNow.Api.Models
{
    public class Sala : BaseModel
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public int Capacidade { get; set; }
        public string Recursos { get; set; }
    }
}
