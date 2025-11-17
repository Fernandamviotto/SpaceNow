namespace SpaceNow.Backend.Application.DTOs;

public class SalaDto
{
    public int SalaId { get; set; }
    public string Nome { get; set; } = string.Empty;
    public int Capacidade { get; set; }
    public int PredioId { get; set; }
    public int TipoDeSalaId { get; set; }
    public TipoDeSalaDto? TipoDeSala { get; set; }
    public bool Status { get; set; }
}

public class SalaConsultaResponse
{
    public List<SalaDto> Items { get; set; } = new();
    public int TotalCount { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
}

public class CreateSalaRequest
{
    public string Nome { get; set; } = string.Empty;
    public int Capacidade { get; set; }
    public int PredioId { get; set; }
    public int TipoDeSalaId { get; set; }
}

public class UpdateSalaRequest
{
    public string Nome { get; set; } = string.Empty;
    public int Capacidade { get; set; }
    public int PredioId { get; set; }
    public int TipoDeSalaId { get; set; }
    public bool Status { get; set; }
}
