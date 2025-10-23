using Supabase.Postgrest.Attributes;

namespace ProjetoSpaceNow.Api.Models
{
    [Table("sala_responsavel")]
    public class SalaResponsavelModel : BaseEntity
    {
        [Column("sala_id")]
        public Guid SalaId { get; set; }

        [Column("usuario_id")]
        public Guid UsuarioId { get; set; }

        [Reference(typeof(SalaModel))]
        public SalaModel Sala { get; set; }

        [Reference(typeof(UsuarioModel))]
        public UsuarioModel Usuario { get; set; }
    }
}
