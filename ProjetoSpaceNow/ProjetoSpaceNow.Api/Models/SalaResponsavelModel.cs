using Supabase.Postgrest.Attributes;

namespace ProjetoSpaceNow.Api.Models
{
    [Table("sala_responsavel")]
    public class SalaResponsavelModel : BaseEntity
    {
        [Column("sala_id")]
        public int SalaId { get; set; }

        [Column("usuario_id")]
        public int UsuarioId { get; set; }

        [Reference(typeof(SalaModel))]
        public SalaModel Sala { get; set; }

        [Reference(typeof(UsuarioModel))]
        public UsuarioModel Usuario { get; set; }
    }
}
