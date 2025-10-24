using ProjetoSpaceNow.Api.Models.Enums;
using Supabase.Postgrest.Attributes;

namespace ProjetoSpaceNow.Api.Models
{
    [Table("sala_disponibilidade")]
    public class SalaDisponibilidadeModel : BaseEntity
    {
        [Column("sala_id")]
        public int SalaId { get; set; }

        [Column("dia_semana")]
        public DiaSemanaEnum DiaSemana { get; set; } 

        [Column("hora_inicio")]
        public TimeSpan HoraInicio { get; set; }

        [Column("hora_fim")]
        public TimeSpan HoraFim { get; set; }

        [Column("ativo")]
        public bool Ativo { get; set; } = true;

        [Reference(typeof(SalaModel))]
        public SalaModel Sala { get; set; }
    }
}
