using ProjetoSpaceNow.Api.Models.Enums;
using Supabase.Postgrest.Attributes;

namespace ProjetoSpaceNow.Api.Models
{
    [Table("sala_tipo")]
    public class SalaTipoModel : BaseEntity
    {
        [Column("nome")]
        public string Nome { get; set; }

        [Column("tipo")]
        public TipoSalaEnum Tipo { get; set; }

        [Reference(typeof(SalaModel))]
        public ICollection<SalaModel> Salas { get; set; } = new List<SalaModel>();
    }
}
