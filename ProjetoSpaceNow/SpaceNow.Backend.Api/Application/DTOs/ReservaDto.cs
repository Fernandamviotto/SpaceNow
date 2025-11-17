namespace SpaceNow.Backend.Application.DTOs;

public class ReservaDto
{
    public int Id { get; set; }
    public string Sala { get; set; } = string.Empty;
    public string Tipo { get; set; } = string.Empty;
    public string Solicitante { get; set; } = string.Empty;
    public string DataInicio { get; set; } = string.Empty;
    public string DataFim { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public int QuantidadePessoas { get; set; }
}

public class CreateReservaRequest
{
    public int SalaId { get; set; }
    public string Sala { get; set; } = string.Empty;
    public string Tipo { get; set; } = string.Empty;
    public string Solicitante { get; set; } = string.Empty;
    public string DataInicio { get; set; } = string.Empty;
    public string DataFim { get; set; } = string.Empty;
    public int QuantidadePessoas { get; set; }
}
