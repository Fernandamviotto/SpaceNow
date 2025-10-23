using ProjetoSpaceNow.Api.Models.Enums;
using Supabase.Postgrest.Attributes;

namespace ProjetoSpaceNow.Api.Models
{
    [Table("reserva")]
    public class ReservaModel : BaseEntity
    {
        [Column("sala_id")]
        public Guid SalaId { get; set; }

        [Column("usuario_id")]
        public Guid UsuarioId { get; set; }

        [Column("data_inicio")]
        public DateTime DataInicio { get; set; }

        [Column("data_fim")]
        public DateTime DataFim { get; set; }

        [Column("status")]
        public StatusReservaEnum Status { get; set; } = StatusReservaEnum.Pendente;

        [Reference(typeof(SalaModel))]
        public SalaModel Sala { get; set; }

        [Reference(typeof(UsuarioModel))]
        public UsuarioModel Usuario { get; set; }
    }
}
