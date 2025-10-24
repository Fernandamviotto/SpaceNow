using Supabase.Postgrest.Attributes;

namespace ProjetoSpaceNow.Api.Models
{
    [Table("sala_recurso")]
    public class SalaRecursoModel : BaseEntity
    {
        [Column("sala_id")]
        public int SalaId { get; set; }

        [Column("nome")]
        public string Nome { get; set; }

        [Reference(typeof(SalaModel))]
        public SalaModel Sala { get; set; }
    }
}
