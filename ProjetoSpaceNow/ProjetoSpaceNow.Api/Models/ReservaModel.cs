using ProjetoSpaceNow.Api.Models.Enums;
using Supabase.Postgrest.Attributes;

namespace ProjetoSpaceNow.Api.Models
{
    [Table("reserva")]
    public class ReservaModel : BaseEntity
    {
        [Column("sala_id")]
        public int SalaId { get; set; }

        [Column("usuario_id")]
        public int UsuarioId { get; set; }

        [Column("data_inicio")]
        public DateTime DataInicio { get; set; }

        [Column("data_fim")]
        public DateTime DataFim { get; set; }

        [Column("status")]
        public StatusReservaEnum Status { get; set; } = StatusReservaEnum.Pendente;

        [Column("tipo")]
        public TipoReservaEnum TipoReserva { get; set; }

        [Reference(typeof(SalaModel))]
        public SalaModel Sala { get; set; }

        [Reference(typeof(UsuarioModel))]
        public UsuarioModel Usuario { get; set; }
    }
}
