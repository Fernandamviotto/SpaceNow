using Supabase.Postgrest.Attributes;

namespace ProjetoSpaceNow.Api.Models
{
    [Table("andar")]
    public class AndarModel : BaseEntity
    {

        [Column("apelido")]
        public string Apelido { get; set; }

        [Column("predio_id")]
        public int PredioId { get; set; }

        [Reference(typeof(PredioModel))]
        public PredioModel Predio { get; set; }

        [Reference(typeof(SalaModel))]
        public ICollection<SalaModel> Salas { get; set; }
    }
}
