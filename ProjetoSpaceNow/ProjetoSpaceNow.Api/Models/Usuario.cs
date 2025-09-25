using Supabase.Postgrest.Models;

namespace ProjetoSpaceNow.Api.Models
{
    public class Usuario : BaseModel
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Perfil { get; set; }
    }
}
