using SpaceNow.Backend.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace SpaceNow.Backend.Domain.Entities;

public class Reserva
{
    public int Id { get; set; }
    public int SalaId { get; set; }
    public string Sala { get; set; } = string.Empty;
    [EnumDataType(typeof(ReservaTipoEnum))]
    public ReservaTipoEnum Tipo { get; set; }
    public string Solicitante { get; set; } = string.Empty;
    public string DataInicio { get; set; } = string.Empty;
    public string DataFim { get; set; } = string.Empty;
    public string Status { get; set; } = "Pendente";
    public int QuantidadePessoas { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
