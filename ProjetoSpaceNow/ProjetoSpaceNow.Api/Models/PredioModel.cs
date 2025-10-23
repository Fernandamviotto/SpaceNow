using Supabase.Postgrest.Attributes;

namespace ProjetoSpaceNow.Api.Models
{
    [Table("predio")]
    public class PredioModel : BaseEntity
    {
        [Column("apelido")]
        public string Apelido { get; set; }

        [Reference(typeof(AndarModel))]
        public ICollection<AndarModel> Andares { get; set; }
    }
}
