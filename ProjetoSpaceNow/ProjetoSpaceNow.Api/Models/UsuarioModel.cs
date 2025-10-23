using ProjetoSpaceNow.Api.Models.Enums;
using Supabase.Postgrest.Attributes;

namespace ProjetoSpaceNow.Api.Models
{
    [Table("usuario")]
    public class UsuarioModel : BaseEntity
    {
        [Column("nome")]
        public string Nome { get; set; }

        [Column("email")]
        public string Email { get; set; }

        [Column("perfil")]
        public PerfilUsuarioEnum Perfil { get; set; }

        [Reference(typeof(SalaResponsavelModel))]
        public ICollection<SalaResponsavelModel> SalasResponsavel { get; set; }

        [Reference(typeof(ReservaModel))]
        public ICollection<ReservaModel> Reservas { get; set; }
    }
}
