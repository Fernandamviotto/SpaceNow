namespace SpaceNow.Backend.Domain.Entities;

public class Sala
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public int Capacidade { get; set; }
    public int PredioId { get; set; }
    public int TipoDeSalaId { get; set; }
    public bool Status { get; set; } = true;
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
