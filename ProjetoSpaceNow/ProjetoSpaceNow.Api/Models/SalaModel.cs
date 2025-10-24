using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace ProjetoSpaceNow.Api.Models
{
    [Table("sala")]
    public class SalaModel : BaseEntity
    {
        [Column("apelido")]
        public string Apelido { get; set; }

        [Column("capacidade")]
        public int Capacidade { get; set; }

        [Column("publico_externo")]
        public bool PublicoExterno { get; set; }

        [Column("andar_id")]
        public int AndarId { get; set; }

        [Reference(typeof(AndarModel))]
        public AndarModel Andar { get; set; }

        [Column("sala_tipo_id")]
        public int SalaTipoId { get; set; }

        [Reference(typeof(SalaTipoModel))]
        public SalaTipoModel SalaTipo { get; set; }

        [Reference(typeof(SalaRecursoModel))]
        public ICollection<SalaRecursoModel> Recursos { get; set; }

        [Reference(typeof(SalaResponsavelModel))]
        public ICollection<SalaResponsavelModel> Responsaveis { get; set; }

        [Reference(typeof(SalaDisponibilidadeModel))]
        public ICollection<SalaDisponibilidadeModel> Disponibilidades { get; set; }
    }
}
